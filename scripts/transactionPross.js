import { closeWindowFunc } from "./buttons";
import { recentTransactionsUpdate, updateDisplay } from "./display";

const typeInput = document.getElementById("typeInput");
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const windowAmountBefore = document.getElementById("windowAmountBefore");
const buildTransaction = document.getElementById("addTransactionWindowBtn");

function getCurrentTime() {
  return new Date().getTime();
}

function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

export class TransactionCreate {
  constructor(
    type,
    description,
    amount,
    category,
    timestamp = getCurrentTime(),
    date = getCurrentDate(),
  ) {
    this.type = type;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.timestamp = timestamp;
    this.date = date;
  }
}

// 🧠 Change category list when type changes
typeInput.addEventListener("change", () => {
  if (typeInput.value === "income") {
    categoryInput.innerHTML = `
      <option value="salary">Salary</option>
      <option value="freelance">Freelance</option>
      <option value="investment">Investment</option>
      <option value="gift">Gift</option>
      <option value="otherIncome">Other</option>`;
  } else if (typeInput.value === "expense") {
    categoryInput.innerHTML = `
      <option value="food">Food</option>
      <option value="transport">Transport</option>
      <option value="entertainment">Entertainment</option>
      <option value="bills">Bills</option>
      <option value="shopping">Shopping</option>
      <option value="health">Health</option>
      <option value="otherExpense">Other</option>`;
  }
});

// 💾 Load saved transactions safely
export let transactions = [];
try {
  const saved = localStorage.getItem("transactions");
  transactions = saved ? JSON.parse(saved) : [];
} catch (e) {
  console.error("⚠️ Error loading transactions from localStorage:", e);
  transactions = [];
}

// ➕ Add new transaction
buildTransaction.addEventListener("click", () => {
  if (amountInput.value === "") {
    amountInput.style.border = "2px solid red";
    windowAmountBefore.style.opacity = "0.7";
    return;
  }

  amountInput.style.border = "none";
  windowAmountBefore.style.opacity = "0";

  const newTrans = new TransactionCreate(
    typeInput.value,
    descriptionInput.value,
    amountInput.value,
    categoryInput.value,
  );

  transactions.push(newTrans);

  // 💾 Save to localStorage
  localStorage.setItem("transactions", JSON.stringify(transactions));

  closeWindowFunc();
  console.log("✅ Added transaction:", newTrans);

  // 🧩 Update all visuals (balances, chart, list)
  updateDisplay();
});

// 🗑️ Delete transaction by timestamp
export function deleteTransaction(timestamp) {
  const index = transactions.findIndex((t) => t.timestamp === timestamp);
  if (index !== -1) {
    console.log("🗑️ Deleting transaction with timestamp:", timestamp);
    transactions.splice(index, 1);

    // 💾 Save to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // 🔄 Update display fully
    updateDisplay();
  }
}

// 🧩 Show saved transactions on first page load
document.addEventListener("DOMContentLoaded", () => {
  if (transactions.length > 0) {
    console.log(`🔁 Loaded ${transactions.length} transactions from storage`);
    updateDisplay();
    recentTransactionsUpdate();
  }
});
