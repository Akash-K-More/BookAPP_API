const Book = require('../models/Books');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({message: 'Book retrived successfully', books: books});
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
};

exports.getBooksByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find books associated with the given user ID
        const books = await Book.find({ userId });

        if (!books || books.length === 0) {
            return res.status(200).json({ message: 'No books found for this user.',  books: books });
        }

        res.status(200).json({message: 'Book retrived successfully', books: books});
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
};


exports.addBook = async (req, res) => {
    const { title, author, description, userId } = req.body;

    try {
        // Create a new book instance
        const newBook = new Book({
            title,
            author,
            description,
            userId
        });

        // console.log(newBook);
        // Save the book to the database
        const savedBook = await newBook.save();

        res.status(201).json({ message: 'Book added successfully', book: savedBook });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
};


exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the book by ID
        const deletedBook = await Book.findByIdAndDelete(id);

        // Check if the book was found and deleted
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};