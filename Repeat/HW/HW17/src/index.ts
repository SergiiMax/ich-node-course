// Task 1

function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0,
): number {
  return price * quantity * (1 - discount / 100);
}

console.log(calculateTotal(100, 3));
console.log(calculateTotal(100, 3, 10));

// Task 2

let id: string | number = "asd123";

function displayId(id: string | number): void {
  if (typeof id === "string") {
    console.log(`ID: ${id.toUpperCase()}`);
  } else if (typeof id === "number") {
    console.log(`ID: ${id * 10}`);
  }
}

displayId(id);
displayId(25);
displayId("test");

//Task 3

interface Order {
  orderId: string;
  amount: number;
  status: "pending" | "shipped" | "delivered";
}

const orders: Order[] = [
  { orderId: "ORD-001", amount: 150, status: "pending" },
  { orderId: "ORD-002", amount: 300, status: "shipped" },
  { orderId: "ORD-003", amount: 200, status: "delivered" },
  { orderId: "ORD-004", amount: 100, status: "pending" },
];

function filterOrdersByStatus(
  orders: Order[],
  status: Order["status"],
): Order[] {
  return orders.filter((order) => order.status === status);
}

console.log(filterOrdersByStatus(orders, "pending"));

//Task 4

const productInfo: [string, number, number] = ["Laptop", 1000, 10];

function updateStock(
  inventory: { [productName: string]: number },
  productInfo: [string, number, number],
): { [productName: string]: number } {
  const [name, , quantity] = productInfo;
  return { ...inventory, [name]: (inventory[name] ?? 0) + quantity };
}

const inventory = { Laptop: 5, Phone: 20 };
console.log(updateStock(inventory, productInfo));
console.log(updateStock(inventory, ["Tablet", 500, 7]));
