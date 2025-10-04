const closeWindow = document.getElementById("closeWindow");
const transactionBtn = document.getElementById("transactionBtn");

const addTransactionWindow = document.getElementById("transactionWindow");
const containerWindow = document.getElementById("container");

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
