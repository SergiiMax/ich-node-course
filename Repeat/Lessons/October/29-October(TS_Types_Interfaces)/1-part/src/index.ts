let value: string | number;

function readData(data: string | number): number {
  if (typeof data === "string") {
    return data.length;
  } else {
    return data * 2;
  }
}

value = "Wabalabudabdab";
// console.log(readData(value));

value = 2;
// console.log(readData(value));

// ====================================== Task 2 ==========================================

type Person = {
  name: string;
  age: number;
};

type Employee = {
  position: string;
};

type PersonEmployee = Person & Employee;

const worker: PersonEmployee = {
  name: "Sergii",
  age: 40,
  position: "Student",
};

// console.log(worker);

// ================================ Task 3 ================================

type Address = {
  city: string;
  street: string;
};

type User = {
  name: string;
  age: number;
  address: Address;
};

const user: User = {
  name: "John",
  age: 40,
  address: {
    city: "Magdeburg",
    street: "John-straße 77",
  },
};

function userInfo(info: User): void {
  console.log(
    `User name: ${info.name}, age: ${info.age}, address: ${user.address.street}, ${user.address.city}`,
  );
}

// userInfo(user)

// ==================================== Task 3.2 ===============================================

type Product = {
  name: string;
  price: number;
  description?: string;
  readonly id: number;
};

const products: Product[] = [
  {
    name: "Laptop",
    price: 1000,
    description: "Very gooda",
    id: 1,
  },
  {
    name: "Keyboard",
    price: 100,
    id: 2,
  },
  {
    name: "Mouse",
    price: 1000,
    description: "Not so good",
    id: 3,
  },
];

function printProductsInfo(products: Product[]): void {
    products.forEach(product => {
        console.log(`Product name: ${product.name}, price: ${product.price}, id: ${product.id}, ${product.description ? `descriptiption: ${product.description}` : ""}`)
    });
}

// printProductsInfo(products)

// ======================================= Task 4 ==============================================

interface Product1 {
    name: string;
    price: number;
    category?: string;
}

const product: Product1 = {
    name: "Laptop",
    price: 1000,
    // category: 'Technics'
}

const productProperties = (value: Product1): string => `Name: ${value.name}, price: ${value.price}${value.category ? `, category: ${value.category}` : ""}`;

// console.log(productProperties(product));

// ======================================== Task 5 =============================================

interface Person1 {
    name: string;
    age: number;
}

interface Employee1 extends Person {
    position: string
}

const employee: Employee1 = {
    name: 'Bob',
    age: 10,
    position: 'Super admin'
}

const employeeInfo = (info: Employee1) => `Name: ${info.name}, position: ${info.position}`

// console.log(employeeInfo(employee));

// ======================================== Task 6 =============================================

interface signatureFunc {
  (a: number, b: number): number
}

const sum: signatureFunc = (a, b) => a + b

// ======================================== Task 6.2 ===========================================

interface IProduct {
  name: string;
  price: number;
  category: string;
}

const products1: IProduct[] = [
  {
    name: 'Laptop',
    price: 1000,
    category: 'Technics'
  },
  {
    name: 'Iphone',
    price: 1500,
    category: 'Smartphones'
  },
  {
    name: 'Mouse',
    price: 100,
    category: 'Accessories'
  },
]

interface signatureFunc1 {
  (products: IProduct[]): string
}

const getProductsInfo: signatureFunc1 = (products) =>
  products
    .map(
      (product) =>
        `Products name: ${product.name}, price: ${product.price}, category: ${product.category}`,
    )
    .join("\n");

// console.log(getProductsInfo(products1));



