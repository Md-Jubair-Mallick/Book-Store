import { signUp, update, fetch, del_ } from '../controller/user.js'
import express from 'express'

const userRouter = express.Router()

userRouter
.post('/', signUp)
.patch('/:id', update)
.delete('/:id', del_)
.get('/:id', fetch)

export default userRouter