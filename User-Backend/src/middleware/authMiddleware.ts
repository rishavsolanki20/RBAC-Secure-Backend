import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as OriginalJwtPayload } from 'jsonwebtoken';

interface JwtPayload extends OriginalJwtPayload {
  _id: string;
  role: string;
}
import dotenv from 'dotenv';
import User from '../models/userModel';
import { UserPayload } from '../types/types';

dotenv.config();


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);
  console.log('JWT Secret:', process.env.JWT_SECRET);

  if (!authHeader) {
    res.status(403).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  if (!token) {
    res.status(403).json({ message: 'Token missing in Authorization header' });
    return;
  }
  console.log("Token:", token);

  try {
    console.log("JWT Secret (Before Verification):", process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified Token Payload:", verified);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};




export const checkAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).send('Access Denied');
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    if (user.role !== 'admin') {
      res.status(403).send('Access Denied');
      return;
    }

    req.user = { _id: user._id, role: user.role };
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid Token');
  }
};