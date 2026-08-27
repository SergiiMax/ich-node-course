export namespace Finance {
  export class LoanCalculator {
    static calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
      const monthlyRate = annualRate / 12 / 100;
      if (monthlyRate === 0) return principal / months;

      const factor = Math.pow(1 + monthlyRate, months);
      const monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);
      return Number(monthlyPayment.toFixed(2));
    }
  }

  export class TaxCalculator {
      static calculateTax(income: number, taxRate: number = 13): number {
      const tax = (income * taxRate) / 100;
      return Number(tax.toFixed(2));
    }
  }
}