const rowInput = document.getElementById("row-input");
const colInput = document.getElementById("col-input");
const enterButton = document.getElementById("enter-button");
const grid = document.querySelector("main ul");
const simulateButton = document.getElementById("simulate-button");

let rowValue;
let colValue;
enterButton.addEventListener("click", () => {
   rowValue = rowInput.value;
   colValue = colInput.value;
});

console.log(rowValue);
