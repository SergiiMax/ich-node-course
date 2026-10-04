// console.log('A'); // 1

// setTimeout(() => console.log('B'), 100); // 5

// setTimeout(() => console.log('C'), 0); // 4

// Promise.resolve().then(() => console.log('D')); // 3

// console.log('E'); // 2


//----------------------------------------------------------

// console.log('one'); // 1

// async function foo() {
//   console.log('two'); // 2
//   await null;
//   console.log('three'); // 3 (микрозадача, потому что после await)
// }

// foo();

// setTimeout(() => console.log('four'), 0); // 5

// Promise.resolve().then(() => console.log('five')); // 4 

// console.log('six'); // 3




// -------------------------------
console.log('---------------------------');

console.log('1'); // 1

async function foo() {
  console.log('two'); // 2
  await null;
  console.log('three'); // 5 (микрозадача, потому что после await)
}

foo();

setTimeout(() => console.log('2'), 0); // 7

Promise.resolve().then(() => console.log('3')); // 6

process.nextTick(() => console.log('4')); // 4
// nextTick - это отдельная очередь, которая имеет наибольший приоритет над микрозадачами, т.е. выполнится перед микрозадачами

console.log('5'); // 3