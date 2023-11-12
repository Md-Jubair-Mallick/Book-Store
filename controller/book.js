import Book from  '../model/book.js'
/** upload a book */
const upload = async(req, res)=>{
    try {
    const book = new Book(req.body)
    await book.save()
    res.status(201).json('book is uploaded successfully')
    } catch(error) {
        res.status(400).json(error)
    }
}
/** delete from database (only author can do this) */
const del_ = async(req, res)=>{
try {
    const { id } = req.params
    await Book.findByIdAndDelete(id)
    res.status(200).json('book is deleted successfully')
} catch (error) {
    res.status(400).json(error)
}
}
/** update book (only author can do this) */
const update = async(req, res)=>{
    try {
        const { id } = req.params
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true}).exec()
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json(error)
    }
}
/** fetch books */
const fetch = async(req, res)=>{
    let query = Book.find()
    let numOfBook =  Book.find()

    if(req.query.category){ //fetch by catagory
        query = query.find({category: req.query.category})
        numOfBook = numOfBook.find({category: req.query.category})
    }
    if(req.query.author){ //fetch by author
        query = query.find({author: req.query.author})
        numOfBook = numOfBook.find({author: req.query.author})
    }
    if(req.query.sort && req.query.order){ //sort by price or rate
        query = query.sort({[req.query.sort] : req.query.order})
        numOfBook = numOfBook.sort({[req.query.sort] : req.query.order})
    }
    if(req.query.page && req.query.limit){ //sort by price
        const pageSize = req.query.limit
        const page = req.query.page
        query = query.skip(pageSize*(page-1)).limit(pageSize)
    }
    try{
        const books = await query.exec()
        numOfBook = await numOfBook.count().exec()
        res.set('X-Total-Count', numOfBook)
        res.status(200).json(books)
    } catch(error){
        res.status(400).json(error)
    }
}
const fetchById = async(req, res)=>{
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json(error)
    }
}
export { upload, del_, update, fetch, fetchById };