'use strict'

import express from 'express'
import { isAdmin, validateJwt } from '../middlewares/validator.jwt.js'
import { login, register, update, deleteT} from './teacher.controller.js'

const api = express.Router()

api.post('/login',login)    
api.post('/register', register)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteT)

export default api