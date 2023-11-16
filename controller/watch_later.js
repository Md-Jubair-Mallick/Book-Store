import WL from '../model/watch_later.js';

const add = async(req, res)=>{
    try {
        const wl = new WL(req.body)
        const wl_ = await wl.save()
        // res.status(201).json('book is added successfully')
        res.status(201).json(wl_)
    } catch (error) {
        res.status(400).json('ctrl_watch_later_add => ' + error)
    }
}
const update = async(req, res)=>{ //only for status update
    try {
        const { id } = req.params
        await WL.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json('status updated successfully')
    } catch (error) {
        res.status(400).json('ctrl_watch_later_update => ' + error)
    }
}
const del_ = async(req, res)=>{
    try {
        const { id } = req.params
        await WL.findByIdAndDelete(id)
        res.status(201).json('Removed successfully')
    } catch (error) {
        res.status(400).json('ctrl_watch_later_del_ => ' + error)
    }
}
const fetch = async(req, res)=>{
    const userId = req.query.user
    let query = WL.find({user : userId}) // by user id
    let numOfWLItem = WL.find({user : userId})

    if(req.query.sort && req.query.order){ //by (add_date)
        query = query.sort({[req.query.sort]: req.query.order})
    }
    /** sort by published date & views */
    if(req.query.status){ // by status
        query = query.find({ status : req.query.status })
    }
    try {
        const wlItem = await query.populate('book').exec()
        numOfWLItem = numOfWLItem.count().exec()
        res.set('X-Total-Count', numOfWLItem)
        res.status(200).json(wlItem)
    } catch (error) {
        res.status(400).json('ctrl_watch_later_fetch => ' + error)
    }
}
/* const fetch = async(req, res)=>{
    const userId = req.query.user
    let query = WL.find({user : userId}) // by user id
    let numOfWLItem = WL.find({user : userId})

    if(req.query.sort && req.query.order){ //by (add_date)
        console.log(req.query.sort)
        if(req.query.sort === 'sort'){
            query = query.sort({[req.query.sort]: req.query.order})
        } else {
            query = query.populate({
                path: "book",
                options: {sort : { [req.query.sort]: req.query.order === 'asc' ? 1 : -1}}
            })
            var skip = true;
        }
    }
    if(req.query.status){ // by status
        query = query.find({ status : req.query.status })
    }

    try {
        if (skip){
            var wlItem = await query.exec()
            console.log(1)
        }   else {
            var wlItem = await query.populate('book').exec()
            console.log(2)
        }
        numOfWLItem = numOfWLItem.count().exec()
        res.set('X-Total-Count', numOfWLItem)
        res.status(200).json(wlItem)
    } catch (error) {
        res.status(400).json('ctrl_watch_later_fetch => ' + error)
    }
}*/
export { add, update, del_, fetch }