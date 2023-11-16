import { Schema, mongoose } from 'mongoose'

const watchlaterSchema = new Schema({
    user:{type: Schema.Types.ObjectId, required: true, ref: 'User'},
    book:{type: Schema.Types.ObjectId, required: true, ref: 'Book'},
    status: {type: String, required: true, default: 'unwatched'},
    add_date: {type: Date, required: true, default: Date.now()}
})

export default mongoose.model('WatchLaterBook', watchlaterSchema)
