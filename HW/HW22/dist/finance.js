export var Finance;
(function (Finance) {
    class LoanCalculator {
        static calculateMonthlyPayment(principal, annualRate, months) {
            const monthlyRate = annualRate / 12 / 100;
            if (monthlyRate === 0)
                return principal / months;
            const factor = Math.pow(1 + monthlyRate, months);
            const monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);
            return Number(monthlyPayment.toFixed(2));
        }
    }
    Finance.LoanCalculator = LoanCalculator;
    class TaxCalculator {
        static calculateTax(income, taxRate = 13) {
            const tax = (income * taxRate) / 100;
            return Number(tax.toFixed(2));
        }
    }
    Finance.TaxCalculator = TaxCalculator;
})(Finance || (Finance = {}));
