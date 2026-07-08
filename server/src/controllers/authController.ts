import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Admin, AuditLog } from '../models';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { config } from '../config';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    if (!admin.is_active) {
      res.status(401).json({ error: 'Account is inactive' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Update last login
    await admin.update({ last_login: new Date() });

    // Generate tokens
    const accessToken = generateAccessToken({
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

    const refreshToken = generateRefreshToken({
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

    // Log audit
    await AuditLog.create({
      admin_id: admin.id,
      action: 'login',
      entity_type: 'admin',
      entity_id: admin.id,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({
      message: 'Login successful',
      accessToken,
      admin: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ error: 'Refresh token required' });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);

    const admin = await Admin.findByPk(decoded.id);

    if (!admin || !admin.is_active) {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = generateAccessToken({
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ['password'] }
    });

    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }

    res.json({ admin });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
