// src/controllers/notes.ts
import { Request, Response } from 'express';
import Note from '../models/notesModel';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

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

export const getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const verified = verifyToken(req);
        if (!verified) {
            res.status(401).send('Unauthorized');
            return;
        }

        const notes = await Note.find({ userId: verified.id });
        res.status(200).send(notes);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;

    const verified = verifyToken(req);
    if (!verified) {
        res.status(401).send('Unauthorized');
        return;
    }

    const newNote = new Note({
        title,
        description,
        userId: verified.id,
    });

    try {
        const savedNote = await newNote.save();
        res.status(201).send(savedNote);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const verified = verifyToken(req);
        if (!verified) {
            res.status(401).send('Unauthorized');
            return;
        }

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: verified.id },
            req.body,
            { new: true }
        );

        if (!updatedNote) {
            res.status(404).send('Note not found');
            return;
        }

        res.status(200).send(updatedNote);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const verified = verifyToken(req);
        if (!verified) {
            res.status(401).send('Unauthorized');
            return;
        }

        const removedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: verified.id,
        });

        if (!removedNote) {
            res.status(404).send('Note not found');
            return;
        }

        res.status(200).send(removedNote);
    } catch (error) {
        res.status(400).send(error);
    }
};
