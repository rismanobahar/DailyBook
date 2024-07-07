import mongoose from "mongoose";

//Model file is basically about giving atribute and identity for the table used from database
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true, //Means this table must not be empty
        },
        author: {
            type: String,
            required: true, //Means this table must not be empty
        },
        publishYear: {
            type: Number,
            required: true, //Means this table must not be empty
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model('Cat', bookSchema);