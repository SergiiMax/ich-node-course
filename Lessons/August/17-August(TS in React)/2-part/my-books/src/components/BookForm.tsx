import { useState, type FormEvent } from "react";

interface BookFormProps {
  onAdd: (title: string, author: string, year: number) => void;
}

function BookForm({ onAdd }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (title.trim() === "") return;

    onAdd(title, author, Number(year));

    setTitle("");
    setAuthor("");
    setYear("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Автор"
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Год"
      />
      <button>Add Book</button>
    </form>
  );
}

export default BookForm;
