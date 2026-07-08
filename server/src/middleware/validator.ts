import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      console.log('Validating request body:', req.body)
      schema.parse(req.body);
      console.log('Validation passed')
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors)
        res.status(400).json({
          error: 'Validation Error',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
        return;
      }
      console.error('Unknown validation error:', error)
      res.status(400).json({ error: 'Validation failed' });
    }
  };
};
