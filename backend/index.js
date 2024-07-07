import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

//MIDDLEWARE FOR PARSING REQUEST BODY
app.use(express.json());

//MIDDLEWARE FOR HANDLING CORS POLICY
//OPTION 1: ALLOW ALL ORIGINS WITH DEFAULT OF CORS(*)
app.use(cors());
//OPTION 2: ALLOW CUSTOM ORIGINS
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

// app.get('/', (request, response) => {
//     console.log(request)
//     return response.status(234).send('Welcome to MERN Stack tutorial')
// });

//starting the backend side with path /books
app.use('/books', booksRoute);


//connecting with database and port
mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
     console.log(`App is listening to port : ${PORT}`);
 });
})
.catch((error) => {
    console.log(error);
});