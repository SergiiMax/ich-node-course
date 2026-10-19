import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    publishedDate: {
        type: Date,
        max: [Date.now, "Date can't be in future"],
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, "Book must have an Author"],
        index: true
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book;