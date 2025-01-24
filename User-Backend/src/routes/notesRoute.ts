import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controller/notesController';

const router = Router();


router.get('/', getNotes);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
