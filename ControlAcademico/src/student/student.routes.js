'use strict'

import express from 'express'
import { validateJwt, validateJwtStudent } from '../middlewares/validator.jwt.js'
import {login, register, update, deleteS, search} from './student.controller.js'

const api = express.Router()

api.post('/login',login)
api.get('/search', search)
api.put('/update/:id',[validateJwtStudent],update)
api.post('/register', register)
api.delete('/delete', [validateJwt], deleteS)

export default api