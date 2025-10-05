const closeWindow = document.getElementById("closeWindow");
const transactionBtn = document.getElementById("transactionBtn");

const addTransactionWindow = document.getElementById("transactionWindow");
const containerWindow = document.getElementById("container");

const typeInput = document.getElementById("typeInput");
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");

export function closeWindowFunc() {
  containerWindow.style.transform = "scale(0)";
  addTransactionWindow.style.backgroundColor = "rgba(0, 0, 0, 0)";

  setTimeout(() => {
    addTransactionWindow.style.display = "none";
  }, 200);
}

export function openWindowFunc() {
  addTransactionWindow.style.display = "flex";
  addTransactionWindow.style.transform = "scale(1)";
  typeInput.value = "expense";

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

  descriptionInput.value = "";
  amountInput.value = "";

  setTimeout(() => {
    addTransactionWindow.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    containerWindow.style.transform = "scale(1)";
  }, 0);
}

// ✅ Attach event listeners *after* DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  closeWindow.addEventListener("click", closeWindowFunc);
  transactionBtn.addEventListener("click", openWindowFunc);
});
