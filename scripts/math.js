import { transactions } from "./transactionPross";

export function transactionsMath() {
  let total = [];
  let totalIncome = [];
  let totalExpenses = [];

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "expense") {
      total.push(Number(transactions[i].amount) * -1);
      totalExpenses.push(Number(transactions[i].amount));
    } else {
      total.push(Number(transactions[i].amount));
      totalIncome.push(Number(transactions[i].amount));
    }
  }

  const expenseAverage =
    totalExpenses.length > 0
      ? totalExpenses.reduce((a, b) => a + b) / totalExpenses.length
      : 0;

  const largestExpense =
    totalExpenses.length > 0 ? Math.max(...totalExpenses) : 0;
  const largestIncome = totalIncome.length > 0 ? Math.max(...totalIncome) : 0;

  const totalSum = total.reduce((a, b) => a + b, 0);
  const totalIncomeSum = totalIncome.reduce((a, b) => a + b, 0);
  const totalExpenseSum = totalExpenses.reduce((a, b) => a + b, 0);

  const savingsRate =
    totalIncomeSum > 0
      ? ((totalIncomeSum - totalExpenseSum) / totalIncomeSum) * 100
      : 0;

  return {
    total,
    totalIncome,
    totalExpenses,
    expenseAverage,
    largestExpense,
    largestIncome,
    totalSum,
    totalIncomeSum,
    totalExpenseSum,
    totalTransactions: transactions.length,
    savingsRate,
  };
}
