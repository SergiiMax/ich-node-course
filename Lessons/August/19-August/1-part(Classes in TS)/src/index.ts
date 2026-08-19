// Создайте класс `User`, который имеет два свойства: `name` (тип `string`) и `age` (тип `number`).

// Напишите конструктор, который принимает значения для имени и возраста и присваивает их соответствующим свойствам.

// Добавьте метод `greet`, который выводит в консоль сообщение с приветствием, включающим имя пользователя.

class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Heloooooo ${this.name}`);
  }
}

const sergii = new User("Sergii", 40);
// sergii.greet();

// Задача 1. Продукт
// Создайте класс Product с двумя свойствами: title (тип string) и price (тип number).
// Напишите конструктор, который принимает название и цену и присваивает их соответствующим свойствам.
// Добавьте метод getInfo, который возвращает строку вида "Товар: Хлеб, цена: 50".

class Product1 {
  title: string;
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
  getInfo() {
    console.log(`Product: ${this.title}, price: ${this.price}`);
  }
}

const laptop = new Product1("Acer", 1200)
// laptop.getInfo()

// Задача 2. Банковский счёт
// Создайте класс BankAccount со свойствами owner (тип string) и balance (тип number).
// Напишите конструктор, который принимает имя владельца и начальный баланс.
// Добавьте метод deposit, который принимает сумму (тип number), увеличивает balance на эту сумму и выводит в консоль новый баланс.

class BankAccount1 {
    name: string
    amount: number

    constructor(name: string, amount: number) {
        this.name = name
        this.amount = amount
    }
    deposit(money: number) {
        const newBalance = this.amount + money
        console.log(`Your balance was changed: ${newBalance}`);
    }
}

const myAccaount = new BankAccount1("Sergii", 1000)
// myAccaount.deposit(200)

// Задача 3. Прямоугольник
// Создайте класс Rectangle со свойствами width (тип number) и height (тип number).
// Напишите конструктор, который принимает ширину и высоту.
// Добавьте метод getArea, который вычисляет и возвращает площадь прямоугольника.

class Rectangle {
    width: number
    height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    getArea() {
        const area = this.width * this.height
        console.log(`Area: ${area}`);
    }
}

const rectangle = new Rectangle(10, 15)
// rectangle.getArea()

// Задача 4. Книга
// Создайте класс Book со свойствами author (тип string), title (тип string) и isRead (тип boolean).
// Напишите конструктор, который принимает автора и название, а свойству isRead по умолчанию присваивает false.
// Добавьте метод markAsRead, который меняет значение isRead на true и выводит в консоль сообщение "Книга прочитана".


class Book {
    author: string
    title: string
    isRead: boolean

    constructor(author: string, title: string) {
        this.author = author
        this.title = title
        this.isRead = false
    }

    markAsRead() {
        this.isRead = true
        console.log(`The book is read: ${this.isRead}`)
    }
}

const book = new Book("I am", "My First Book")
// book.markAsRead()

// Измените класс `User`, добавив приватное свойство `password`, которое будет хранить пароль пользователя.
// Добавьте публичный метод для установки пароля (например, `setPassword(password: string)`), который позволит менять значение этого приватного свойства.
// Создайте публичный метод `checkPassword(password: string)`, который будет проверять корректность введенного пароля и возвращать `true` или `false`.

class User1 {
  name: string;
  age: number;
  private password: string

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.password = ""
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public checkPassword(password: string): boolean {
    return this.password === password
  }
}

const sergiiMax = new User1("Sergii", 40);

sergiiMax.setPassword('superPassword')
// console.log(sergiiMax.checkPassword('superPassword'));

// Задача 1. Сейф (Safe)
// Создайте класс Safe, добавив приватное свойство pinCode, которое будет хранить PIN-код сейфа (тип string).
// Добавьте публичный метод для установки PIN-кода (например, setPinCode(pinCode: string)), который позволит менять значение этого приватного свойства.
// Создайте публичный метод unlock(pinCode: string), который будет проверять корректность введённого PIN-кода и возвращать true или false.

class Safe {
    name: string
    private pinCode: string

    constructor(name: string) {
        this.name = name
        this.pinCode = ''
    }

    public setPinCode(pinCode: string): void {
        this.pinCode = pinCode
    }

    public unlock(pinCode: string): boolean {
        return this.pinCode === pinCode
    }
}

const safe = new Safe('My Safe')
safe.setPinCode('Pa-pa-pa')
// console.log(safe.unlock('121212'))

// Задача 2. Профиль сотрудника (Employee)
// Создайте класс Employee, добавив приватное свойство salary, которое будет хранить зарплату сотрудника (тип number).
// Добавьте публичный метод для установки зарплаты (например, setSalary(salary: number)), который позволит менять значение этого приватного свойства.
// Создайте публичный метод checkSalary(salary: number), который будет проверять, совпадает ли переданное значение с текущей зарплатой, и возвращать true или false.

class Employee1 {
    name: string
    position: string
    age: number
    private salary: number

    constructor(name: string, position: string, age: number) {
        this.name = name
        this.position = position
        this.age = age
        this.salary = 0
    }

    public setSalary(salary: number) {
        this.salary = salary
    }

    public checkSalary(salary: number): boolean {
        return this.salary === salary
    }
}

const employee1 = new Employee1('Sergii', 'Web-Developer', 40)
employee1.setSalary(3500)
// console.log(employee1.checkSalary(3500));


// Task 3 

// Класс `Car` и его наследник `ElectricCar`

// Создайте класс `Car`, который будет содержать свойства `make` (марка автомобиля) и `year` (год выпуска).

// Добавьте метод `start()`, который выводит в консоль сообщение `"The car is starting"`.

// Затем создайте класс-наследник `ElectricCar`, который добавит новое свойство `batteryLevel` (уровень заряда батареи).

// Переопределите метод `start()`, чтобы он выводил сообщение `"The electric car is starting"`.


class Car {
    make: string
    year: number

    constructor(make: string, year: number) {
        this.make = make
        this.year = year
    }

    start(): void {
        console.log("The car is starting")
    }
}

class ElectricCar extends Car {
    batteryLevel: number

    constructor(make: string, year: number, batteryLevel: number) {
        super(make, year)
        this.batteryLevel = batteryLevel
    }

    start() {
        console.log("The electric car is starting")
    }
}

const car = new Car("BMW", 2017)
// car.start()
const ecar = new ElectricCar("Hyundai", 2022, 90)
// ecar.start()


// Статический метод для создания объектов

// Создайте класс `Product`, который имеет свойства `name` (название продукта) и `price` (цена продукта).

// Добавьте статический метод `createDiscountedProduct`, который принимает название продукта, цену и процент скидки, а затем возвращает новый объект `Product` с учетом скидки.


class Product {
    name: string
    price: number

    constructor(name: string, price: number) {
        this.name = name
        this.price = price
    }

    static createDiscountedProduct(name: string, price: number, discount: number): Product {
        const discountedProduct = price - (price * discount / 100)
        return new Product(name, discountedProduct)
    }
}

// console.log(Product.createDiscountedProduct("Laptop", 1200, 20));


// Модификаторы доступа в классе `BankAccount`

// Создайте класс `BankAccount`, который содержит защищенное свойство `balance` (баланс).

// Реализуйте метод `deposit()`, который увеличивает баланс, и метод `withdraw()`, который уменьшает баланс.

// В классе `BankAccount` должен быть публичный метод `getBalance()`, который возвращает текущий баланс.

// Создайте объект и проверьте работу методов.


class BankAccount {
    protected balance: number

    constructor(balance: number) {
        this.balance = balance
    }
    deposit(money: number) {
        this.balance += money
        console.log(`Your balance was changed: ${this.balance}`);
    }
    withdraw(money: number) {
        this.balance -= money
        console.log(`Your balance was changed: ${this.balance}`);
    }
    public getBalance() {
        console.log(`Current balance: ${this.balance}`)
    }
}

const myAccount = new BankAccount(1000)
// myAccount.deposit(200)
// myAccount.withdraw(100)
// myAccount.getBalance()




// Наследование и работа со статическим свойством

// Создайте класс `Employee` с полями `name` (имя) и `position` (должность).

// Добавьте статическое свойство `employeeCount`, которое увеличивается при создании нового сотрудника.

// Затем создайте класс `Manager`, который наследуется от `Employee` и добавляет новое свойство `department` (отдел).


class Employee {
    name: string
    position: string
    static employeeCount: number = 0

    constructor(name: string, position: string) {
        this.name = name
        this.position = position
        
        Employee.employeeCount += 1
    }
}

class Manager extends Employee {
    department: string

    constructor(name: string, position: string, department: string) {
        super(name, position)
        this.department = department
    }
}

const employee = new Employee('Sergii', 'Web-Developer')
console.log(employee);
const employee2 = new Manager('Sergii', 'Web-Developer', "IT")
console.log(employee2)
console.log(Employee.employeeCount);



// Переопределение метода `describe` в классе `Book`

// Создайте класс `Book`, который содержит свойства `title` (название книги) и `author` (автор).

// Добавьте метод `describe()`, который выводит в консоль информацию о книге.

// Затем создайте класс `EBook`, который наследуется от `Book` и добавляет новое свойство `fileSize` (размер файла).

// Переопределите метод `describe()`, чтобы добавить информацию о размере файла.

class Book1 {
    author: string
    title: string

    constructor(author: string, title: string) {
        this.author = author
        this.title = title
    }

    describe(): void {
        console.log(`Book title: ${this.title}, book author: ${this.author}`);
    }
}

class EBook extends Book1 {
    fileSize: number

    constructor(author: string, title: string, fileSize: number) {
        super(author, title)
        this.fileSize = fileSize
    }

    describe(): void {
        super.describe()
        console.log(`File size: ${this.fileSize} MB`);
    }
}

// const book1 = new Book1("I am", "My First Book")
// book1.describe()
// const ebook1 = new EBook("I am", "My First Book", 15)
// ebook1.describe()
