import Fav from '../model/addToFav.js';

const add = async(req, res)=>{
    try {
        const userId = req.body.user
        const bookId = req.body.book
        let query = Fav.find({user : userId})
        query = await query.find({book : bookId})

        if(query.length === 0){
            const fav = new Fav(req.body)
            await fav.save()
            res.status(201).json('book is added successfully')
        }   else{
            res.status(201).json('already added')
        }
    } catch (error) {
        res.status(400).json('ctrl_addToFav_add => ' + error)
    }
}
const update = async(req, res)=>{ //only for status update
    try {
        const { id } = req.params
        await Fav.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json('status updated successfully')
    } catch (error) {
        res.status(400).json('ctrl_addToFav_update => ' + error)
    }
}
const del_ = async(req, res)=>{
    try {
        const { id } = req.params
        await Fav.findByIdAndDelete(id)
        res.status(201).json('Removed successfully')
    } catch (error) {
        res.status(400).json('ctrl_addToFav_del_ => ' + error)
    }
}
const fetch = async(req, res)=>{
    const userId = req.query.user
    let query = Fav.find({user : userId}) // by user id
    let numOfFavItem = Fav.find({user : userId})

    if(req.query.sort && req.query.order){ //by (add_date)
        query = query.sort({[req.query.sort]: req.query.order})
    }
    /** sort by published date & views */
    if(req.query.status){ // by status
        query = query.find({ status : req.query.status })
    }
    try {
        const favItem = await query.populate('book').exec()
        numOfFavItem = numOfFavItem.count().exec()
        res.set('X-Total-Count', numOfFavItem)
        res.status(200).json(favItem)
    } catch (error) {
        res.status(400).json('ctrl_addToFav_fetch => ' + error)
    }
}

export { add, update, del_, fetch }