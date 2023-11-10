import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
const app = express()
const port = process.env.PORT

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.disable('x-powered-by') //less hacker know about our stack

/** mongodb & express server */
async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database is connected')
        app.listen(port, ()=>{
            console.log(`server is runing athttp://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}