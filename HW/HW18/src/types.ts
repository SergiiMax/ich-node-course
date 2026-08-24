export type Admin = {
  name: string
  permissions: string[]
};

export type User = {
  name: string
  email: string
};

export type AdminUser = Admin & User

export type Car = {
    make: string
    model: string
    engine: {
        type: string
        horsepower: number
    }
    year?: number
}

export interface Product {
    name: string
    price: number
}

export interface Employee {
    name: string
    salary: number
}

export interface Person {
    firstName: string
    lastName: string
}

export interface Student extends Person {
    grade: number
}

export interface ConcatStringFn {
    (str1: string, str2: string): string
}