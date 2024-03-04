'use strict'

import express from 'express'
import { search, update, deleteC, save } from './class.controller.js'

const api = express.Router()

api.post('/save', save)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteC)
api.get('/search', search)

export default api