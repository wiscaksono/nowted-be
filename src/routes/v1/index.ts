import express from 'express'

import authRoute from './auth.route'
import folderRoute from './folder.route'
import userRoute from './user.route'
import noteRoute from './note.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/folders',
    route: folderRoute
  },
  {
    path: '/notes',
    route: noteRoute
  }
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
