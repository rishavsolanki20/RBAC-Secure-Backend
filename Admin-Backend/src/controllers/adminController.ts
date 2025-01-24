import { Request, Response } from 'express';
import User from '../models/userModel';
import axios from 'axios';
import { logAction } from './auditController';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const verifyToken = (req: Request): JwtPayload | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return null;
    }
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified as JwtPayload;
        return verified as JwtPayload;
    } catch (error) {
        return null;
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send('Failed to fetch users');
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Failed to fetch user');
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const verified = verifyToken(req);
    if (!verified) {
        res.status(401).send('Unauthorized');
        return;
    }
        if (req.user) {
            await logAction(verified.id, 'DELETE_USER', `Deleted user with ID ${req.params.id}`);
        } else {
            res.status(401).send('Unauthorized: User information is missing');
            return;
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Failed to delete user');
    }
};

export const getNotesForAudit = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).json({ message: 'Authorization header missing' });
            return;
        }

        const token = authHeader.split(' ')[1];

        const response = await axios.get('http://localhost:5000/api/admin/notes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Failed to fetch notes');
    }
};
