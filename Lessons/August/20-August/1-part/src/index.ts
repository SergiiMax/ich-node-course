// Создайте абстрактный класс `Employee`, который будет представлять сотрудника. В этом классе определите абстрактный метод `calculateSalary()`. Этот метод должен возвращать зарплату сотрудника, но не должен иметь реализации в самом `Employee`.

// Создайте два класса, которые будут наследовать `Employee`:

// `FullTimeEmployee` — для сотрудников на полной ставке.
// `PartTimeEmployee` — для сотрудников, работающих неполный рабочий день.

// В каждом из этих классов реализуйте метод `calculateSalary()` по-своему:

// В `FullTimeEmployee` зарплата может рассчитываться как фиксированная сумма.
// В `PartTimeEmployee` зарплата может зависеть от количества отработанных часов и почасовой ставки.

abstract class Employee {
    abstract calculateSalary(): number
}

class FullTimeEmployee extends Employee {
    constructor(private salary: number) {
        super()
    }
    calculateSalary(): number {
            return this.salary
        }
}

class PartTimeEmployee extends Employee {
    constructor(private hourlyRade: number, private totalHours: number) {
        super()
    }
    calculateSalary(): number {
        return this.hourlyRade * this.totalHours
    }
}

const Anna = new PartTimeEmployee(12, 95)
const MArry = new FullTimeEmployee(2000)
console.log(Anna.calculateSalary());
console.log(MArry.calculateSalary())

// Задача 2 — Транспорт
// Создайте абстрактный класс Vehicle, который представляет транспортное средство.
// В нём определите:
// свойство brand — марка транспорта; 
// абстрактный метод move(), который должен описывать движение транспорта. 
// Создайте два класса:
// Car — автомобиль; 
// Bicycle — велосипед. 
// Каждый класс должен по-своему реализовать move():
// Car должен возвращать строку вроде "Car Toyota is driving"; 
// Bicycle — "Bicycle Trek is riding". 
// Также создайте массив из нескольких транспортных средств и вызовите move() для каждого из них.


abstract class Vehicle {
    constructor(public brand: string) {}

    abstract move(): string
}

class Car extends Vehicle {
    move(): string {
        return `Car ${this.brand} is driving`
    }
}

class Bicycle extends Vehicle {
    move(): string {
        return `Bicycle ${this.brand} is riding`
    }
}

console.log(new Car("Toyota").move())
console.log(new Bicycle("Trek").move())


// Задача 3 — Платёжная система
// Создайте абстрактный класс PaymentMethod.
// В нём определите:
// свойство amount — сумма платежа; 
// абстрактный метод pay(), который выполняет оплату. 
// Создайте два класса:
// CreditCardPayment; 
// PayPalPayment. 
// Реализуйте pay() по-разному:
// CreditCardPayment должен возвращать "Paid $100 using credit card"; 
// PayPalPayment должен возвращать "Paid $100 using PayPal".

abstract class PaymentMethod {
    constructor(protected amount: number) {}

    abstract pay(): string
}

class CreditCardPayment extends PaymentMethod {
    pay(): string {
        return `Paid $${this.amount} using credit card`
    }
}

class PayPalPayment extends PaymentMethod {
    pay(): string {
        return `Paid $${this.amount} using PayPal`
    }
}

const creditCard = new CreditCardPayment(100)
const payPal = new PayPalPayment(100)
console.log(creditCard.pay());
console.log(payPal.pay())