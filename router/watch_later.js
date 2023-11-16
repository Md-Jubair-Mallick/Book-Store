import { add, update, del_, fetch } from '../controller/watch_later.js'
import express from 'express'

const wlRouter = express.Router()

wlRouter
.post('/WL', add)
.patch('/WL/:id', update)
.delete('/WL/:id', del_)
.get('/WL', fetch)

export default wlRouter