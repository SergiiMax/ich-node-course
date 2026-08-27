import { Finance } from "./finance.js";
import { generateFibonacci, generatePrimeNumbers } from "./sequenceUtils.js";
import { capitalize, reverseString } from "./stringUtils.js";
import { UserManagement } from "./userManagement.js";

console.log(capitalize("hello!!!"));
console.log(reverseString('cat'));

const loanPayment = Finance.LoanCalculator.calculateMonthlyPayment(100000, 12, 12);
console.log(`Ежемесячный платёж по кредиту: ${loanPayment}`);

const taxAmount = Finance.TaxCalculator.calculateTax(50000, 13);
console.log(`Сумма налога (13% от 50 000): ${taxAmount}`);

const admin = new UserManagement.Admin.AdminUser('Алексей', 'admin@example.com');
console.log(admin.getInfo())

admin.setSuperAdmin(true);
console.log(admin.getInfo())

console.log('Фибоначчи до 50:', generateFibonacci(50));
console.log('Простые числа до 30:', generatePrimeNumbers(30));