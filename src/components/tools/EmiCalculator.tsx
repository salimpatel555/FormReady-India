"use client";

import { useState } from "react";
import { calculateEmi, formatCurrency, type EmiResult } from "@/lib/calculators/emi";
import { Calculator, AlertCircle } from "lucide-react";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState<string>("500000");
  const [annualRate, setAnnualRate] = useState<string>("10.5");
  const [tenureValue, setTenureValue] = useState<string>("5");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [result, setResult] = useState<EmiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const p = parseFloat(principal.replace(/,/g, ""));
    const r = parseFloat(annualRate);
    let months = parseInt(tenureValue, 10);

    if (isNaN(p) || p <= 0) {
      setError("Please enter a valid loan amount greater than zero.");
      return;
    }
    if (isNaN(r) || r < 0 || r > 50) {
      setError("Please enter a valid annual interest rate (0–50%).");
      return;
    }
    if (isNaN(months) || months <= 0) {
      setError("Please enter a valid tenure.");
      return;
    }

    if (tenureUnit === "years") {
      months = months * 12;
    }

    if (months > 600) {
      setError("Tenure cannot exceed 50 years.");
      return;
    }

    try {
      const res = calculateEmi({
        principal: p,
        annualRate: r,
        tenureMonths: months,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed");
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleCalculate}
        className="rounded-xl border border-border bg-muted/50 p-6 space-y-5"
      >
        <div>
          <label htmlFor="principal" className="block text-sm font-medium text-foreground/90 mb-1">
            Loan amount (₹)
          </label>
          <input
            id="principal"
            type="text"
            inputMode="numeric"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g. 500000"
            className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-foreground/90 mb-1">
            Annual interest rate (%)
          </label>
          <input
            id="rate"
            type="number"
            step="0.01"
            min="0"
            max="50"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="e.g. 10.5"
            className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tenure" className="block text-sm font-medium text-foreground/90 mb-1">
              Loan tenure
            </label>
            <input
              id="tenure"
              type="number"
              min="1"
              value={tenureValue}
              onChange={(e) => setTenureValue(e.target.value)}
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-foreground/90 mb-1">
              Unit
            </label>
            <select
              id="unit"
              value={tenureUnit}
              onChange={(e) => setTenureUnit(e.target.value as "years" | "months")}
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Calculator className="h-4 w-4" />
          Calculate EMI
        </button>
      </form>

      {error && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-sm text-red-800 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {result && (
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Repayment Summary</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-lg bg-accent p-4 text-center">
              <p className="text-sm text-indigo-700 font-medium">Monthly EMI</p>
              <p className="mt-1 text-2xl font-bold text-indigo-900">
                {formatCurrency(result.monthlyEmi)}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground font-medium">Total Interest</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground font-medium">Total Payment</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(result.totalPayment)}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm border-t border-border pt-4">
            <dt className="text-muted-foreground">Principal</dt>
            <dd className="font-medium text-right">{formatCurrency(result.principal)}</dd>
            <dt className="text-muted-foreground">Interest rate</dt>
            <dd className="font-medium text-right">{result.annualRate}% p.a.</dd>
            <dt className="text-muted-foreground">Tenure</dt>
            <dd className="font-medium text-right">
              {result.tenureMonths} months
              {result.tenureMonths >= 12 &&
                ` (${(result.tenureMonths / 12).toFixed(1)} years)`}
            </dd>
          </dl>

          <p className="mt-6 text-xs text-muted-foreground">
            This is an estimate using the standard reducing-balance EMI formula.
            Actual bank charges, processing fees and rate changes may differ.
          </p>
        </section>
      )}
    </div>
  );
}
