import bookRouter from './router/book.js'
import userRouter from './router/user.js'
import wlRouter from './router/watch_later.js'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.disable('x-powered-by') //less hacker know about our stack

app.use('/books', bookRouter)
app.use('/user', userRouter)
app.use('/playlist', wlRouter)
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

/** mongodb & express server */
const main = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database is connected')
    } catch (error) {
        console.log(error)
    }
}
main()
app.listen(port, ()=>{
    console.log(`server is runing at http://localhost:${port}`)
})