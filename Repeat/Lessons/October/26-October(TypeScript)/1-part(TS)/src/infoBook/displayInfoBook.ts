interface Book {
    title: string,
    author: string,
    yearPublished: number,
    isAvailable: boolean,
}

function printBookInfo(book: Book): void {
    console.log(`Title: ${book.title}`);
    console.log(`Author: ${book.author}`);
    console.log(`Year published: ${book.yearPublished}`);
    console.log(`IsaAvailable: ${book.isAvailable}`);
    console.log('');
}

printBookInfo({ title: "1984", author: "George Orwell", yearPublished: 1949, isAvailable: true })
printBookInfo({ title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960, isAvailable: false })
printBookInfo({ title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925, isAvailable: true })