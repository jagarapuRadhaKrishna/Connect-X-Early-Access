import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    res.status(400).json({
      error: 'Validation Error',
      details: error.message
    });
    return;
  }

  if (error.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    });
    return;
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(409).json({
      error: 'Conflict',
      message: 'A record with this information already exists'
    });
    return;
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    res.status(400).json({
      error: 'Foreign Key Constraint',
      message: 'Referenced record does not exist'
    });
    return;
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: config.env === 'development' ? error.message : 'An unexpected error occurred'
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
};
