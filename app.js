const rowInput = document.getElementById("row-input");
const colInput = document.getElementById("col-input");
const enterButton = document.getElementById("enter-button");
const grid = document.querySelector("main ul");
const simulateButton = document.getElementById("simulate-button");

let rowValue = rowInput.value;
let colValue = colInput.value;
console.dir(grid);
enterButton.addEventListener("click", () => {
   rowValue = parseInt(rowInput.value);
   colValue = parseInt(colInput.value);
   grid.style.gridTemplateRows = "repeat(" + rowValue + ", 1fr)";
   grid.style.gridTemplateColumns = "repeat(" + colValue + ", 1fr)";
});
