const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateUser = require('../middlewares/validateUser'); // Auth middleware

router.get('/books', validateUser, bookController.getAllBooks);
router.get('/books/user/:userId', bookController.getBooksByUserId);
router.post('/books', validateUser, bookController.addBook); 
router.delete('/books/:id', validateUser, bookController.deleteBook);

module.exports = router;