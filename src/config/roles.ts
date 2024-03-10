import { Role } from '@prisma/client'

const folderRoles = ['getFolders', 'createFolders', 'deleteFolders', 'updateFolders']
const noteRoles = ['getNotes', 'createNotes', 'deleteNotes', 'updateNotes']
const userRoles = ['getUsers', 'manageUsers']

const allRoles = {
  [Role.USER]: [...folderRoles, ...noteRoles],
  [Role.ADMIN]: [...userRoles]
}

export const roles = Object.keys(allRoles)
export const roleRights = new Map(Object.entries(allRoles))
