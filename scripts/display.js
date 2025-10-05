import { transactionsMath } from "./math.js";
import { transactions, deleteTransaction } from "./transactionPross.js";
import { Chart } from "chart.js/auto";
import trashIconUrl from "url:../icons/trash.png";

// 🔹 Cache DOM elements
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
const recentContainer = document.getElementById("recentContainer");

let chartInstance = null;

// 📊 Category labels
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
export function recentTransactionsUpdate() {
  let allTransactions = [...transactions];

  // 🧠 Show all by default or filter if dropdown set
  if (
    !transactionsBottom.value ||
    transactionsBottom.value === "transactions"
  ) {
    allTransactions = [...transactions];
  } else if (transactionsBottom.value === "income") {
    allTransactions = allTransactions.filter((t) => t.type === "income");
  } else if (transactionsBottom.value === "expenses") {
    allTransactions = allTransactions.filter((t) => t.type === "expense");
  }

  // Sort by timestamp (newest first)
  allTransactions.sort((a, b) => b.timestamp - a.timestamp);

  // Clear and rebuild
  recentContainer.innerHTML = "";

  for (let i = 0; i < allTransactions.length; i++) {
    const t = allTransactions[i];
    recentContainer.innerHTML += `
      <div class="recent" data-id="${t.timestamp}">
        <div class="recentLeft">
          <div class="recentDescription">
            ${t.description.length === 0 ? "" : `<div class="description">${t.description}</div>`}
            <div class="category">${t.type}</div>
          </div>
          <div class="recentDate">${t.date}</div>
        </div>
        <div class="recentRight">
          ${
            t.type === "expense"
              ? `<div class="money expense">-$${Number(t.amount).toFixed(2)}</div>`
              : `<div class="money income">+$${Number(t.amount).toFixed(2)}</div>`
          }
          <img class="delete" data-id="${t.timestamp}" src="${trashIconUrl}" alt="Delete">
        </div>
      </div>`;
  }

  if (allTransactions.length === 0) {
    recentContainer.innerHTML = `<p class="noTransactions">No transactions yet.</p>`;
  }
}

// 📈 Create chart safely after DOM loads
function createChart() {
  const chartCanvas = document.getElementById("myChart");
  if (!chartCanvas) {
    console.warn("⚠️ Chart canvas not found");
    return;
  }

  const ctx = chartCanvas.getContext("2d");

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

  // 💰 Update text summaries safely
  balanceResume.innerText = `$${allValues.totalSum.toFixed(2)}`;
  balanceResume.style.color =
    allValues.totalSum > 0 ? "green" : allValues.totalSum < 0 ? "red" : "black";

  incomeResume.innerText = `$${allValues.totalIncomeSum.toFixed(2)}`;
  expensesResume.innerText = `$${allValues.totalExpenseSum.toFixed(2)}`;
  transactionsResume.innerText = allValues.totalTransactions;
  expenseAverage.innerText = `$${allValues.expenseAverage.toFixed(2)}`;
  largestAverage.innerText = `$${allValues.largestExpense.toFixed(2)}`;
  incomeAverage.innerText = `$${allValues.largestIncome.toFixed(2)}`;

  // ✅ Safe savingsRate handling
  const savings =
    typeof allValues.savingsRate === "number" && !isNaN(allValues.savingsRate)
      ? allValues.savingsRate
      : 0;

  savingsAverage.innerText = `${savings.toFixed(2)}%`;

  // 🧾 Update recent transactions
  recentTransactionsUpdate();
}

// 🎛 Initialize after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  transactionsBottom.addEventListener("change", recentTransactionsUpdate);
  addTransactionWindowBtn.addEventListener("click", updateDisplay);

  // ✅ Default dropdown value
  transactionsBottom.value = "transactions";

  // ✅ Create chart after DOM ready (fixes dist issue)
  createChart();

  // 🔁 Load saved data into UI
  updateDisplay();

  // 🗑️ Delete listener
  recentContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const idToDelete = Number(e.target.dataset.id);
      deleteTransaction(idToDelete);
    }
  });
});
