const _ = require("lodash");
const numbers = [1, 2, 3, 4, 5];
// _.shuffle() Рандомно меняем местами елементы массива
const shuffled = _.shuffle(numbers); 
console.log("Original array:", numbers);
console.log("Shuffled array:", shuffled);
