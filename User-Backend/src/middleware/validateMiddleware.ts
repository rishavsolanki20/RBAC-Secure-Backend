import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ message: 'All fields are required' });
  } else {
    next();
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required' });
  } else {
    next();
  }
};
