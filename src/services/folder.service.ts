import { Prisma, Folder, Note } from '@prisma/client'
import httpStatus from 'http-status'

import prisma from '../client'
import ApiError from '../utils/ApiError'
import { noteService } from '../services'

const folderKeys: (keyof Folder)[] = ['id', 'name', 'updatedAt', 'createdAt']
const noteKeys: (keyof Note)[] = ['id', 'title', 'content', 'archived', 'favorited', 'createdAt', 'updatedAt']

const createFolder = async (name: string, userId: number) => {
  return prisma.folder.create({
    data: { name, userId }
  })
}

const getFolders = async (userId: number) => {
  return prisma.folder.findMany({
    where: { userId, deleted: false },
    select: {
      ...folderKeys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      _count: {
        select: { Note: true }
      }
    }
  })
}

const getDeletedFolders = async (userId: number) => {
  return prisma.folder.findMany({
    where: { userId, deleted: true },
    select: {
      ...folderKeys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      _count: {
        select: {
          Note: true
        }
      }
    }
  })
}

const getFolder = async (folderId: number) => {
  const folder = await prisma.folder.findFirst({
    where: { id: folderId, deleted: false },
    select: {
      ...folderKeys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      Note: {
        select: noteKeys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        where: { deleted: false }
      }
    }
  })
  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found')
  }
  return folder
}

const updateFolder = async (folderId: number, updateBody: Prisma.FolderUpdateInput) => {
  const folder = await getFolder(folderId)
  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found')
  }
  return prisma.folder.update({
    where: { id: folderId },
    data: updateBody,
    select: folderKeys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  })
}

const deleteFolder = async (folderId: number) => {
  const folder = await getFolder(folderId)
  if (!folder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found')
  }

  await noteService.deleteNoteByFolder(folderId)

  return prisma.folder.delete({ where: { id: folderId } })
}

export default {
  createFolder,
  getFolders,
  getFolder,
  deleteFolder,
  updateFolder,
  getDeletedFolders
}
