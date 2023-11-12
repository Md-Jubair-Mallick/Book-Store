import User from '../model/user.js';
import bcrypt from 'bcrypt'

const signUp = async(req, res)=>{
    const { username, email, phone, password, profilePic } = req.body
    try {
        const user = new User({username, email, phone, profilePic, password: bcrypt.hashSync(password, 10)})
        await user.save()
        res.status(201).json('signup successfully')
    } catch (error) {
        res.status(400).json( 'ctrl_user_signup => ' + error)
    }
}
const update = async(req, res)=>{
    try {
        const { id } = req.params
        await User.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json('updated successfully')
    } catch (error) {
        res.status(400).json( 'ctrl_user_update => ' + error)
    }
}
const fetch = async(req, res)=>{
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json('ctrl_user_fetch => '+ error)
    }
}
const del_ = async(req, res)=>{
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(201).json('delete successfully')
    } catch (error) {
        res.status(400).json('ctrl_user_del_=> '+ error)
    }
}
export { signUp, update, fetch, del_ }