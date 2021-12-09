// Models
const Book = require('../model/book');
const Issue = require('../model/issue');
// Validation
const validateBookInput = require("../validation/book");

// Fetch Book details
exports.getBookDetails = async (req, res) => {
    // Check validation
    const { errors, isValid } = validateBookInput.findBook(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const book= await Book.findOne({isbn:req.params.isbn})
    if (!book) {
        return res.status(200).send('Book not found');
    }
    res.status(200).send(book);
};

// Fetch Book History
exports.getBookHistory = async (req, res) => {
    // Check validation
    const { errors, isValid } = validateBookInput.findBook(req.params);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find Issue
    const issue = await Issue.find({isbn:req.params.isbn})
        .catch(err => console.log(err));

    return res.status(200).json(issue)

};

// Fetch all the books
exports.getBooks = async (req, res) => {
    const books = await Book.find({})
        .select({
            bname:'$bname',
            author:'$author',
            isbn:'$isbn'
        })
        .catch(err => console.log(err));

    return res.status(200).json(books)

};