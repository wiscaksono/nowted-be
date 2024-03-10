import Joi from 'joi'

const createFolder = {
  body: Joi.object().keys({
    name: Joi.string().required()
  })
}

const deleteFolder = {
  query: Joi.object().keys({
    folderId: Joi.number().integer()
  })
}

const getFolders = {
  query: Joi.object().keys({
    status: Joi.string().valid('deleted')
  })
}

const getFolder = {
  query: Joi.object().keys({
    folderId: Joi.number().integer()
  })
}

const updateFolder = {
  body: Joi.object().keys({
    name: Joi.string()
  })
}

export default {
  createFolder,
  deleteFolder,
  getFolders,
  getFolder,
  updateFolder
}
