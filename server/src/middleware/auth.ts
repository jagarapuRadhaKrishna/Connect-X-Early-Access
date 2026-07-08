import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { Admin } from '../models';

export interface AuthRequest extends Request {
  admin?: {
    id: number;
    email: string;
    role: 'super_admin' | 'admin';
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const decoded = jwt.verify(token, config.jwt.secret) as {
      id: number;
      email: string;
      role: 'super_admin' | 'admin';
    };

    const admin = await Admin.findByPk(decoded.id);

    if (!admin || !admin.is_active) {
      res.status(401).json({ error: 'Invalid or inactive admin' });
      return;
    }

    req.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (roles: ('super_admin' | 'admin')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.admin) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.admin.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
};

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, config.jwt.secret) as {
        id: number;
        email: string;
        role: 'super_admin' | 'admin';
      };

      const admin = await Admin.findByPk(decoded.id);

      if (admin && admin.is_active) {
        req.admin = {
          id: admin.id,
          email: admin.email,
          role: admin.role
        };
      }
    }

    next();
  } catch (error) {
    next();
  }
};
