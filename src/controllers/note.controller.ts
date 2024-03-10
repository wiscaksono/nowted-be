import httpStatus from 'http-status'

import catchAsync from '../utils/catchAsync'
import exclude from '../utils/exclude'

import { noteService } from '../services'

const createNote = catchAsync(async (req, res) => {
  const { title, content, folderId } = req.body
  const note = await noteService.createNote(title, content, Number(folderId))
  const cleanedNote = exclude(note, ['deleted', 'deletedAt', 'folderId'])
  res.status(httpStatus.CREATED).send(cleanedNote)
})

const getNotes = catchAsync(async (_, res) => {
  const note = await noteService.getNotes()
  res.send(note)
})

const getNote = catchAsync(async (req, res) => {
  const noteId = Number(req.params.noteId)
  const note = await noteService.getNote(noteId)
  res.send(note)
})

const deleteNote = catchAsync(async (req, res) => {
  const noteId = Number(req.params.noteId)
  await noteService.deleteNote(noteId)
  res.status(httpStatus.NO_CONTENT).send()
})

const updateNote = catchAsync(async (req, res) => {
  const noteId = Number(req.params.noteId)
  const note = await noteService.updateNote(noteId, req.body)
  const cleanedNote = exclude(note, ['deleted', 'deletedAt', 'folderId'])
  res.send(cleanedNote)
})

export default {
  createNote,
  getNotes,
  updateNote,
  getNote,
  deleteNote
}
