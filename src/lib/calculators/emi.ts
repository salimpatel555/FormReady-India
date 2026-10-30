/**
 * EMI calculation utilities.
 * Formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
 * where P = principal, r = monthly interest rate, n = number of months
 */

export interface EmiInput {
  principal: number; // loan amount
  annualRate: number; // annual interest rate in percent
  tenureMonths: number;
}

export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  tenureMonths: number;
  annualRate: number;
}

export function calculateEmi(input: EmiInput): EmiResult {
  const { principal, annualRate, tenureMonths } = input;

  if (principal <= 0) {
    throw new Error("Loan amount must be greater than zero.");
  }
  if (annualRate < 0) {
    throw new Error("Interest rate cannot be negative.");
  }
  if (tenureMonths <= 0 || !Number.isInteger(tenureMonths)) {
    throw new Error("Tenure must be a positive whole number of months.");
  }

  // Zero interest case
  if (annualRate === 0) {
    const monthlyEmi = principal / tenureMonths;
    return {
      monthlyEmi,
      totalInterest: 0,
      totalPayment: principal,
      principal,
      tenureMonths,
      annualRate,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyEmi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEmi,
    totalInterest,
    totalPayment,
    principal,
    tenureMonths,
    annualRate,
  };
}

export function formatCurrency(amount: number, locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
