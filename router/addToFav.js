import { add, update, del_, fetch } from '../controller/addToFav.js'
import express from 'express'

const favRouter = express.Router()

favRouter
.post('/Favorite', add)
.patch('/Favorite/:id', update)
.delete('/Favorite/:id', del_)
.get('/Favorite', fetch)

export default favRouter