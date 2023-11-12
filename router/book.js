import { upload, del_, update, fetch, fetchById } from "../controller/book.js";
import  express from 'express'

const bookRouter = express.Router()

bookRouter
.post('/', upload)
.get('/', fetch)
.get('/:id', fetchById)
.patch('/:id', update)
.delete('/:id', del_)

export default bookRouter