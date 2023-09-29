const rowInput = document.getElementById("row-input");
const colInput = document.getElementById("col-input");
const enterButton = document.getElementById("enter-button");
const grid = document.querySelector("main ul");
const simulateButton = document.getElementById("simulate-button");

let rowValue = rowInput.value;
let colValue = colInput.value;

function reduceWidth(width) {
   if (width > 45 && width < 60) {
      width = width - width * (1 / 3);
   } else if (width > 60) {
      width = width - width * (1 / 2);
   }
   return width;
}
function reduceHeight(height) {
   if (height > 45 && height < 60) {
      height = height - height * (1 / 3);
   } else if (height > 60) {
      height = height - height * (1 / 2);
   }
   return height;
}

enterButton.addEventListener("click", () => {
   rowValue = parseInt(rowInput.value);
   colValue = parseInt(colInput.value);
   grid.style.gridTemplateRows = "repeat(" + rowValue + ", 1fr)";
   grid.style.gridTemplateColumns = "repeat(" + colValue + ", 1fr)";
   grid.style.display = "grid";
   let widthValue = 5 * colValue;
   let heightValue = 5 * rowValue;
   widthValue = reduceWidth(widthValue);
   heightValue = reduceHeight(heightValue);
   grid.style.width = widthValue + "rem";
   grid.style.height = heightValue + "rem";

   simulateButton.style.display = "block";
});

function kev(m, n, row, col) {
   if (m == row && n == col) {
      return;
   }
   if (m < row) {
      m += 1;
      const blockElement = document.createElement("div");
      blockElement.style.gridRowStart = m;
      blockElement.style.gridColumnStart = n;
      blockElement.classList.add("block");
      grid.appendChild(blockElement);
      kev(m, n, row, col);
      m -= 1;
   }
   if (n < col) {
      n += 1;
      const blockElement = document.createElement("div");
      blockElement.style.gridRowStart = m;
      blockElement.style.gridColumnStart = n;
      blockElement.classList.add("block");
      grid.appendChild(blockElement);
      kev(m, n, row, col);
      n -= 1;
   }
}

simulateButton.addEventListener("click", () => {
   kev(1, 1, rowValue, colValue);
});
