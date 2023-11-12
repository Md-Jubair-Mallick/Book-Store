import { Schema, mongoose } from 'mongoose'

const bookSchema = new Schema({
    title: {type: String, required: true},
    discription: {type: String, required: true},
    category: {type: String, required: true},
    author: {type: String, required: true},
    thumbnail: {type: String, required: true},
    bookLink: {type: String, required: true},
    price: {type: Number, required: true},
    rate: {type:Number, required: true},
    report: {type: String, required: true},
    comments: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now()},
    viwes:{type: Number, required: true, default: 1},
    download:{type: Number, required: true, default: 0}
})
export default mongoose.model('Books', bookSchema)