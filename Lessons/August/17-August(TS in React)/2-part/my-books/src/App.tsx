import { useState } from "react";
import type { Book } from "./types";
import BookForm from "./components/BookForm";
import BookList from "./components/BooksList";

const initialBooks = [
  {
    id: 1,
    title: "Harry Potter",
    author: "Joanne Rowling",
    year: 1997
  }
]

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  function addBook(title: string, author: string, year: number) {
      const newBook: Book = {
        id: Date.now(),
        title,
        author,
        year
      }
      setBooks([newBook, ...books])
}

function deleteBook(id: number) {
  setBooks(books.filter(book => book.id !== id)
  )
}

   return (
    <>
      <BookForm onAdd={addBook}/>
      <BookList books={books} onDelete={deleteBook}/>
    </>
  )
}

export default App
