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