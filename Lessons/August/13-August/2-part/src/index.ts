interface Product {
    title: string
    price: number
    inStock: boolean
}

const products: Product[] = [
    {
        title: "Laptop",
        price: 1500,
        inStock: true 
    },
    {
        title: "Smartphone",
        price: 1000,
        inStock: false 
    },
    {
        title: "Printer",
        price: 200,
        inStock: true 
    },
    {
        title: "Mouse",
        price: 100,
        inStock: false 
    },
    {
        title: "keyboard",
        price: 200,
        inStock: true 
    }
]

function showInStock(arr: Product[]): string[] {
    const productsInStock = arr.filter(product => product.inStock)
    return productsInStock.map(product => product.title);
}

function getTotalPrice(arr: Product[]): number {
    const productsInStock = arr.filter(product => product.inStock);

    return productsInStock.reduce((sum, product) => {
        return sum + product.price;
    }, 0);
}

console.log(showInStock(products));
console.log(getTotalPrice(products));