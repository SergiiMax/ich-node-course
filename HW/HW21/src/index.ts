// task1

abstract class  Animal {
    abstract makeSound(): string
}

class Dog extends Animal {
    makeSound(): string {
        return "Bark"
    }
}

class Cat extends Animal {
    makeSound(): string {
        return "Meow"
    }
}

const animals: Animal[] = [new Dog(), new Cat()];

animals.forEach((animal) => {
    console.log(animal.makeSound());
});

// task2

abstract class Shape {
    abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
    abstract color: string
}

class ColoredCircle extends ColoredShape {
    color: string;
    radius: number

    constructor(color: string, radius: number) {
        super()
        this.color = color
        this.radius = radius
    }
    calculateArea(): number {
        return Math.PI * this.radius * this.radius
    }
}

class ColoredRectangle extends ColoredShape {
    color: string;
    width: number
    height: number

    constructor(color: string, width: number, height: number) {
        super()
        this.color = color
        this.height = height
        this.width = width
    }

    calculateArea(): number {
        return this.width * this.height
    }
}

const circle = new ColoredCircle("Red", 5);
const rectangle = new ColoredRectangle("Blue",10, 4);

console.log(`Circle: Color = ${circle.color}, Area = ${circle.calculateArea().toFixed(2)}`);
console.log(`Rectangle: Color = ${rectangle.color}, Area = ${rectangle.calculateArea()}`);

// task3

abstract class Appliance {
    abstract turnOn(): void
    abstract turnOff(): void
}

class WashingMachine extends Appliance {
    turnOn(): void {
        console.log("Washing Machine is turned on");
    }
    turnOff(): void {
        console.log("Washing Machine is turned off");
    }
}

class Refrigerator extends Appliance {
    turnOn(): void {
        console.log("Refrigerator is turned on");
    }
    turnOff(): void {
        console.log("Refrigerator is turned off");
    }
}

const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()]
appliances.forEach(appliance => appliance.turnOn())
appliances.forEach(appliance => appliance.turnOff())

// task4

abstract class Account {
    balance: number

    constructor(balance: number) {
        this.balance = balance
    }

    abstract deposit(amount: number): void
    abstract withdraw(amount: number): void
}

class SavingsAccount extends Account {
    interestRate: number

    constructor(balance: number, interestRate: number) {
        super(balance)
        this.interestRate = interestRate
    }

    deposit(amount: number): void {
        this.balance += amount
    }

    withdraw(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount
        } else {
            console.log("Недостаточно средств")
        }
    }

    addInterest(): void {
        const interest = this.balance * this.interestRate
        this.balance += interest
        console.log(`Начислены проценты: ${interest}. Новый баланс: ${this.balance}`)
    }
}

class CheckingAccount extends Account {
    fee: number

    constructor(balance: number, fee: number) {
        super(balance)
        this.fee = fee
    }

    deposit(amount: number): void {
        this.balance += amount
    }

    withdraw(amount: number): void {
        const totalAmount = amount + this.fee
        if (totalAmount <= this.balance) {
            this.balance -= totalAmount
            console.log(`Снято: ${amount} (Комиссия: ${this.fee}). Остаток: ${this.balance}`)
        } else {
            console.log("Недостаточно средств с учетом комиссии")
        }
    }
}

const savings = new SavingsAccount(1000, 0.05)
savings.addInterest()

const checking = new CheckingAccount(500, 10)
checking.withdraw(100)

// task5

abstract class Media {
    abstract play(): string
}

class Audio extends Media {
    play(): string {
        return "Playing audio"
    }
}

class Video extends Media {
    play(): string {
        return "Playing video"
    }
}

const media: Media[] = [new Audio(), new Video()]

media.forEach(item => console.log(item.play()))
