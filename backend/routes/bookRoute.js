import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

// ROUTE FOR SAVE A NEW BOOK
router.post('/', async (request, response) => {
    try{
        if(!request.body.title || 
            !request.body.author || 
            !request.body.publishYear || 
            !request.body.description
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, description',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            description: request.body.description,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE FOR GET ALL BOOKS FROM DATABASE
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
            }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE FOR GET ONE BOOK FROM DATABASE BY ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE FOR PUT(UPDATE) ONE BOOK FROM DATABASE BY ID
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.description
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, description',
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({ message: 'Book not found'});
        }
        return response.status(200).send({ message: 'Book Updated Successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE FOR DELETE ONE BOOK FROM DATABASE BY ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({ message: 'Book not found'});
        }
        return response.status(200).send({ message: 'Book Deleted Successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;