import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config';
import { testConnection, syncDatabase } from './config/database';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { generalLimiter, authLimiter, registrationLimiter } from './middleware/rateLimiter';
import { verifyTransporter } from './services/emailService';
import authRoutes from './routes/auth';
import registrationRoutes from './routes/registrations';
import exportRoutes from './routes/export';
import careerRoutes from './routes/careers';

const app: Application = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/registrations', registrationLimiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/careers', careerRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    await testConnection();

    // Verify email transporter
    await verifyTransporter();

    // Sync database (in development, you might want to use migrations instead)
    if (config.env === 'development') {
      await syncDatabase();
      // Seed default admin if none exists
      try {
        const { Admin } = await import('./models');
        const adminCount = await Admin.count();
        if (adminCount === 0) {
          const bcryptModule = await import('bcryptjs');
          const bcrypt = (bcryptModule as any).default || bcryptModule;
          const hashedPassword = await bcrypt.hash('Admin@123', 10);
          await Admin.create({
            email: 'admin@connectx.ai',
            password: hashedPassword,
            full_name: 'Super Admin',
            role: 'super_admin',
            is_active: true
          });
          console.log('✅ Default super admin seeded: admin@connectx.ai / Admin@123');
        }
      } catch (seedError) {
        console.error('❌ Failed to seed default admin:', seedError);
      }
    }
    
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📝 Environment: ${config.env}`);
      console.log(`🌐 CORS origin: ${config.cors.origin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
