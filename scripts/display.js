import { transactionsMath } from "./math";
import { transactions } from "./transactionPross";
import { Chart } from "chart.js/auto";

const addTransactionWindowBtn = document.getElementById(
  "addTransactionWindowBtn",
);
const balanceResume = document.getElementById("balanceResume");
const incomeResume = document.getElementById("incomeResume");
const expensesResume = document.getElementById("expensesResume");
const transactionsResume = document.getElementById("transactionsResume");
const expenseAverage = document.getElementById("expenseAverage");
const largestAverage = document.getElementById("largestAverage");
const incomeAverage = document.getElementById("incomeAverage");
const savingsAverage = document.getElementById("savingsAverage");
const transactionsBottom = document.getElementById("transactions");
const whenNoGraph = document.getElementById("whenNoGraph");

const ctx = document.getElementById("myChart").getContext("2d");
let chartInstance = null;

// 📊 Category labels (base order)
const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Shopping",
  "Health",
  "Other",
];

// 💡 Helper: get totals by category
function calculateCategoryTotals() {
  const totals = {
    Food: 0,
    Transport: 0,
    Entertainment: 0,
    Bills: 0,
    Shopping: 0,
    Health: 0,
    Other: 0,
  };

  for (const t of transactions) {
    if (t.type === "expense") {
      switch (t.category) {
        case "food":
          totals.Food += Number(t.amount);
          break;
        case "transport":
          totals.Transport += Number(t.amount);
          break;
        case "entertainment":
          totals.Entertainment += Number(t.amount);
          break;
        case "bills":
          totals.Bills += Number(t.amount);
          break;
        case "shopping":
          totals.Shopping += Number(t.amount);
          break;
        case "health":
          totals.Health += Number(t.amount);
          break;
        case "otherExpense":
          totals.Other += Number(t.amount);
          break;
      }
    }
  }
  return totals;
}

// 🕓 Sort and display recent transactions
function recentTransactionsUpdate() {
  let allTransactions = [...transactions];

  if (transactionsBottom.value === "income") {
    allTransactions = allTransactions.filter((t) => t.type === "income");
  } else if (transactionsBottom.value === "expense") {
    allTransactions = allTransactions.filter((t) => t.type === "expense");
  }

  // Sort by timestamp (newest first)
  allTransactions.sort((a, b) => b.timestamp - a.timestamp);
  console.log("Recent transactions:", allTransactions);
}

// 📈 Create chart once
function createChart() {
  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          label: "Expenses by Category",
          data: [],
          backgroundColor: [
            "#4E79A7",
            "#A0CBE8",
            "#F28E2B",
            "#FFBE7D",
            "#59A14F",
            "#8CD17D",
            "#B6992D",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
    },
  });
}

// 🧮 Update chart and display
export function updateDisplay() {
  const allValues = transactionsMath();
  const totals = calculateCategoryTotals();

  // 🧩 Filter out categories where total = 0
  const filtered = Object.entries(totals)
    .filter(([_, value]) => value > 0)
    .map(([label, value]) => ({ label, value }));

  // 🎨 Update chart
  if (chartInstance) {
    chartInstance.data.labels = filtered.map((i) => i.label);
    chartInstance.data.datasets[0].data = filtered.map((i) => i.value);
    chartInstance.update();

    whenNoGraph.style.display = filtered.length > 0 ? "none" : "block";
  }

  // 💰 Update text summaries
  balanceResume.innerText = `$${allValues.totalSum}`;
  balanceResume.style.color =
    allValues.totalSum > 0 ? "green" : allValues.totalSum < 0 ? "red" : "black";

  incomeResume.innerText = `$${allValues.totalIncomeSum}`;
  expensesResume.innerText = `$${allValues.totalExpenseSum}`;
  transactionsResume.innerText = allValues.totalTransactions;
  expenseAverage.innerText = `$${allValues.expenseAverage}`;
  largestAverage.innerText = `$${allValues.largestExpense}`;
  incomeAverage.innerText = `$${allValues.largestIncome}`;
  savingsAverage.innerText = `${allValues.savingsRate}%`;

  recentTransactionsUpdate();
}

// 🎛 Event listeners
transactionsBottom.addEventListener("change", recentTransactionsUpdate);
addTransactionWindowBtn.addEventListener("click", updateDisplay);
createChart();
