function greet(name: string): string {
  return `Hello, ${name}`;
}

// let message: string = greet('Max');
let message: string = greet("Max");
console.log(message);

function multiplication(a: number, b: number): number {
  return a * b;
}

function dedide(a: number, b: number): number {
  return a / b;
}

console.log(multiplication(2, 3));
console.log(dedide(4, 2));

interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Sergii",
  age: 40,
  email: "sergii@example.com",
};

function showUserInfo(user: User): void {
  console.log(
    `Username: ${user.name}, User age: ${user.age}, User email: ${user.email}`,
  );
}

showUserInfo(user);

