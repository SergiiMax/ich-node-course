import type { Book } from "../types";
import BookItem from "./BookItem";

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
}

function BookList({books, onDelete}: BookListProps) {
    if(books.length === 0) return <p>No books yet</p>
    return (
        <ul>
        {
            books.map(book => (
                <BookItem key={book.id} book={book} onDelete={onDelete}/>
            ))
        }
        </ul>
    )
}

export default BookList