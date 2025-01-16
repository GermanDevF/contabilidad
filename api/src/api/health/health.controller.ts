import type { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response): Response => {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
};
