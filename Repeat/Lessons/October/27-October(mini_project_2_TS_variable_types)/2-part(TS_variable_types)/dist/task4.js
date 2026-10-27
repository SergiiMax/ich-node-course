"use strict";
function describeBook(book) {
    return `Book's title: ${book.title}, book's author: ${book.author}, pages: ${book.pages}`;
}
const book1 = {
    title: 'Autobiography',
    author: 'Sergii M.',
    pages: 10000000
};
// console.log(describeBook(book1));
const fruits = ['banana', 'orange', 'apple', 'pineapple', 'peach'];
const differentArr = ['apple', 2, 'banana', 7];
const books = [
    {
        title: "First Book",
        description: 'Very very interest'
    },
    {
        title: "Second Book",
        description: 'Not so interest as first'
    }
];
const person = ['Sergii', 40];
const displayPerson = (person) => {
    console.log(`Name: ${person[0]}, age: ${person[1]}`);
};
displayPerson(person);
//# sourceMappingURL=task4.js.map