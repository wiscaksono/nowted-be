import express from 'express'
import auth from '../../middlewares/auth'
import validate from '../../middlewares/validate'
import { noteValidation } from '../../validations'
import { noteController } from '../../controllers'

const router = express.Router()

router.route('/').post(auth('createNotes'), validate(noteValidation.createNote), noteController.createNote).get(auth('getNotes'), noteController.getNotes)

router
  .route('/:noteId')
  .get(auth('getNotes'), validate(noteValidation.getNote), noteController.getNote)
  .patch(auth('updateNotes'), validate(noteValidation.updateNote), noteController.updateNote)
  .delete(auth('deleteNotes'), validate(noteValidation.deleteNote), noteController.deleteNote)

export default router
