import { closeWindowFunc } from "./buttons";
import { recentTransactionsUpdate } from "./display";
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
  const month = date.toLocaleString("en-US", { month: "short" }); // e.g. "Oct"
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

typeInput.addEventListener("change", () => {
  if (typeInput.value === "income") {
    categoryInput.innerHTML = `
      <option value="salary">Salary</option>
      <option value="freelance">Freelance</option>
      <option value="investment">Investment</option>
      <option value="gift">Gift</option>
      <option value="otherIncome">Other</option>`;
  } else {
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

export let transactions = [];

buildTransaction.addEventListener("click", () => {
  if (amountInput.value === "") {
    amountInput.style.border = "2px solid red";
    windowAmountBefore.style.opacity = "0.7";
  } else {
    amountInput.style.border = "none";
    windowAmountBefore.style.opacity = "0";

    const newTrans = new TransactionCreate(
      typeInput.value,
      descriptionInput.value,
      amountInput.value,
      categoryInput.value,
    );

    transactions.push(newTrans);
    closeWindowFunc();
    console.log(transactions);
    recentTransactionsUpdate();
  }
});
