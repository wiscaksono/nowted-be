import { User } from '@prisma/client'
import httpStatus from 'http-status'

import exclude from '../utils/exclude'
import catchAsync from '../utils/catchAsync'

import { folderService } from '../services'

const createFolder = catchAsync(async (req, res) => {
  const { name } = req.body
  const user = req.user as User
  const folder = await folderService.createFolder(name, user.id)
  const cleanedFolder = exclude(folder, ['userId', 'deleted', 'deletedAt'])
  res.status(httpStatus.CREATED).send(cleanedFolder)
})

const getFolders = catchAsync(async (req, res) => {
  const user = req.user as User
  const folders = await folderService.getFolders(user.id)
  res.send(folders)
})

const getFolder = catchAsync(async (req, res) => {
  const folderId = Number(req.params.folderId)
  const folder = await folderService.getFolder(folderId)
  res.send(folder)
})

const deleteFolder = catchAsync(async (req, res) => {
  await folderService.deleteFolder(Number(req.params.folderId))
  res.status(httpStatus.NO_CONTENT).send()
})

const updateFolder = catchAsync(async (req, res) => {
  const folderId = Number(req.params.folderId)
  const folder = await folderService.updateFolder(folderId, req.body)
  res.send(folder)
})

const getDeletedFolders = catchAsync(async (req, res) => {
  const user = req.user as User
  const folder = await folderService.getDeletedFolders(user.id)
  res.send(folder)
})

export default {
  createFolder,
  getFolder,
  updateFolder,
  getFolders,
  deleteFolder,
  getDeletedFolders
}
