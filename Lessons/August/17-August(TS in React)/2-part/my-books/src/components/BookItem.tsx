import type { Book } from "../types";

interface BookItemProps {
  book: Book;
  onDelete: (id: number) => void;
}

function BookItem({book, onDelete}: BookItemProps) {
    const {id, title, author, year} = book

    return (
        <li>
            <span>{title}</span>
            <span>{author}</span>
            <span>{year}</span>
            <button onClick={() => onDelete(id)}>Delete</button>
        </li>
        
    )
}

export default BookItem