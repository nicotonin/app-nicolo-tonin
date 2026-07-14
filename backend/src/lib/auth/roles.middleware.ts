import { Request, Response, NextFunction } from 'express';

export const isDipendente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'dipendente') {
      res.status(403).json({ message: "L'utente non è un dipendente" });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const isReferente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'referente') {
      res.status(403).json({ message: "L'utente non è un referente" });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};


