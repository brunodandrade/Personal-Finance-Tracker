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
  descriptionInput.value = "";
  amountInput.value = "";
  categoryInput.value = "food";

  setTimeout(() => {
    addTransactionWindow.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    containerWindow.style.transform = "scale(1)";
  }, 0);
}

closeWindow.addEventListener("click", () => {
  closeWindowFunc();
});

transactionBtn.addEventListener("click", () => {
  openWindowFunc();
});
