import Joi from 'joi'

const createNote = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    folderId: Joi.number().required()
  })
}

const getNote = {
  query: Joi.object().keys({
    noteId: Joi.number().integer()
  })
}

const deleteNote = {
  query: Joi.object().keys({
    noteId: Joi.number().integer()
  })
}

const updateNote = {
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    favorited: Joi.boolean(),
    archived: Joi.boolean(),
    folderId: Joi.number()
  })
}

export default {
  createNote,
  getNote,
  deleteNote,
  updateNote
}
