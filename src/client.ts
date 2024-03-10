import { PrismaClient } from '@prisma/client'
import config from './config/config'

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

/***********************************/
/* SOFT DELETE MIDDLEWARE */
/***********************************/

prisma.$use(async (params, next) => {
  // Check incoming query type
  if (params.model === 'Note' || params.model === 'Folder') {
    if (params.action == 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update'
      params.args['data'] = { deleted: true, deletedAt: new Date() }
    }
    if (params.action == 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany'
      if (params.args.data != undefined) {
        params.args.data['deleted'] = true
      } else {
        params.args['data'] = { deleted: true, deletedAt: new Date() }
      }
    }
  }
  return next(params)
})
if (config.env === 'development') global.prisma = prisma

export default prisma
