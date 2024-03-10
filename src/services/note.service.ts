import { Note, Prisma } from '@prisma/client'
import httpStatus from 'http-status'

import prisma from '../client'
import ApiError from '../utils/ApiError'

import { folderService } from '../services'

const createNote = async (title: string, content: string, folderId: number) => {
  const folder = await folderService.getFolder(folderId)
  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found')
  }
  return prisma.note.create({
    data: { title, content, folderId }
  })
}

const getNotes = async <T extends keyof Note>(keys: T[] = ['id', 'title', 'content', 'archived', 'favorited', 'createdAt', 'updatedAt'] as T[]) => {
  return prisma.note.findMany({
    where: { deleted: false },
    select: {
      ...keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      folder: {
        select: { id: true, name: true }
      }
    }
  })
}

const getNote = async <T extends keyof Note>(noteId: number, keys: T[] = ['id', 'title', 'content', 'archived', 'favorited', 'createdAt', 'updatedAt'] as T[]) => {
  const note = prisma.note.findUnique({
    where: { id: noteId },
    select: {
      ...keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      folder: {
        select: { id: true, name: true }
      }
    }
  })
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found')
  }
  return note
}

const deleteNote = async (noteId: number) => {
  const note = await getNote(noteId)
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found')
  }
  return prisma.note.delete({
    where: { id: noteId }
  })
}

const updateNote = async (noteId: number, data: Prisma.NoteUpdateInput) => {
  const note = await getNote(noteId)
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found')
  }
  return prisma.note.update({
    where: { id: noteId },
    data
  })
}

const deleteNoteByFolder = async (folderId: number) => {
  return prisma.note.deleteMany({
    where: { folderId: folderId }
  })
}

export default {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
  deleteNoteByFolder
}
