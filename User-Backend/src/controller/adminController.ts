import { Request, Response } from 'express';
import Note from '../models/notesModel';

export const getNotesForAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes' });
    }
};
