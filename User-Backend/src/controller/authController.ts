import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { hashPassword, comparePassword } from '../utils/hashUtils';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret or load it from environment variables

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, "123456", {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await comparePassword(password, user.password))) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.email }, "123456", {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
