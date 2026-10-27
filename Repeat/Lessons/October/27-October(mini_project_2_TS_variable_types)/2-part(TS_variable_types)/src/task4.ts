interface Book {
    title: string,
    author: string,
    pages: number,
}

function describeBook(book: Book): string {
    return `Book's title: ${book.title}, book's author: ${book.author}, pages: ${book.pages}`
}

const book1: Book = {
    title: 'Autobiography',
    author: 'Sergii M.',
    pages: 10000000
}
// console.log(describeBook(book1));

const fruits: string[] = ['banana', 'orange', 'apple', 'pineapple', 'peach']
const differentArr: (string | number)[] = ['apple', 2, 'banana', 7]
 const books: object[] = [
    {
        title: "First Book",
        description: 'Very very interest'
    },
    {
        title: "Second Book",
        description: 'Not so interest as first'
    }
 ]

 const person: [string, number] = ['Sergii', 40]
 
 const displayPerson = (person: [string, number]): void => {
    console.log(`Name: ${person[0]}, age: ${person[1]}`);
 }

 displayPerson(person)