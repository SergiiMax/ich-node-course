// task1
function calculateTotal(price: number, quantity: number, discount: number = 0): number {
    return price * quantity * (1 - discount / 100)
}

console.log(calculateTotal(150, 2, 10))

// task2
const id: string | number = 7

function displayId(id: string | number): void {
    if(typeof id === "string") {
        console.log(id.toUpperCase())
    }else if(typeof id === "number") {
        console.log(id * 10)
    }
}

displayId(id)

// task3
type Order = {
    orderId: string;
    amount: number;
    status: "pending" | "shipped" | "delivered";
}

const orders: Order[] = [
  { orderId: "1", amount: 100, status: "pending" },
  { orderId: "1", amount: 100, status: "shipped" },
  { orderId: "1", amount: 100, status: "pending" },
  { orderId: "1", amount: 100, status: "shipped" },
  { orderId: "1", amount: 100, status: "pending" },
  { orderId: "1", amount: 100, status: "delivered" },
  { orderId: "1", amount: 100, status: "delivered" },
];

function filterOrdersByStatus(arr: Order[], status: "pending" | "shipped" | "delivered"): Order[] {
    const filteredOrders = arr.filter(item => item.status === status)
    return filteredOrders
}

console.log(filterOrdersByStatus(orders, "pending"));

// task4
type Inventory = {
    [productName: string]: number
}

const inventory: Inventory = {Laptop: 1}
const productInfo: [string, number, number] = ["Laptop", 1200, 10]

function updateStock(inventory: Inventory, productInfo: [string, number, number]): Inventory {
    const [name, price, quantity] = productInfo
    const current = inventory[name] || 0;
    inventory[name] = current + quantity;
    return inventory
}

console.log(updateStock(inventory, productInfo));
