import express from 'express'
import auth from '../../middlewares/auth'
import validate from '../../middlewares/validate'
import { folderValidation } from '../../validations'
import { folderController } from '../../controllers'

const router = express.Router()

router.route('/').post(auth('createFolders'), validate(folderValidation.createFolder), folderController.createFolder).get(auth('getFolders'), folderController.getFolders)
router.route('/deleted').get(auth('getFolders'), folderController.getDeletedFolders)
router
  .route('/:folderId')
  .get(auth('getFolders'), validate(folderValidation.getFolder), folderController.getFolder)
  .patch(auth('updateFolders'), validate(folderValidation.updateFolder), folderController.updateFolder)
  .delete(auth('deleteFolders'), validate(folderController.deleteFolder), folderController.deleteFolder)

export default router
