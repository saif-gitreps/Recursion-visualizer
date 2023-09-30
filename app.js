const rowInput = document.getElementById("row-input");
const colInput = document.getElementById("col-input");
const enterButton = document.getElementById("enter-button");
const grid = document.querySelector("main ul");
const simulateButton = document.getElementById("simulate-button");
const firstBlockElement = document.createElement("div");

let rowValue = rowInput.value;
let colValue = colInput.value;

class Stack {
   constructor() {
      this.stack = [];
   }
   push(item) {
      this.stack.push(item);
   }
   pop() {
      if (this.stack.length == 0) return;
      this.stack.pop();
   }
   top() {
      return this.stack[this.stack.length - 1];
   }
   empty() {
      return this.stack.length == 0;
   }
}

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

function gridSizeAdjustment(rowValue, colValue) {
   grid.style.gridTemplateRows = "repeat(" + rowValue + ", 1fr)";
   grid.style.gridTemplateColumns = "repeat(" + colValue + ", 1fr)";
   grid.style.display = "grid";
   let widthValue = reduceWidth(5 * colValue);
   let heightValue = reduceHeight(5 * rowValue);
   grid.style.width = widthValue + "rem";
   grid.style.height = heightValue + "rem";
}

function initialBlock() {
   firstBlockElement.style.gridRowStart = 1;
   firstBlockElement.style.gridColumnStart = 1;
   firstBlockElement.classList.add("block");
   grid.appendChild(firstBlockElement);
}

enterButton.addEventListener("click", () => {
   rowValue = parseInt(rowInput.value);
   colValue = parseInt(colInput.value);
   gridSizeAdjustment(rowValue, colValue);
   initialBlock();
   simulateButton.style.display = "block";
});

function kev(m, n, row, col) {
   if (m == row && n == col) {
      return;
   }
   if (m < row) {
      m += 1;
      console.log("right");
      kev(m, n, row, col);
      console.log("left");
      m -= 1;
   }
   if (n < col) {
      n += 1;
      console.log("down");
      kev(m, n, row, col);
      console.log("up");
      n -= 1;
   }
}

simulateButton.addEventListener("click", () => {
   grid.removeChild(firstBlockElement);
   kev(1, 1, rowValue, colValue);
});

//PERFECT TIME1 =  UP:{800(INNER CLOCK),100}  {DOWN:800(INNER CLOCK),1400}.
//PERFECT TIME1 =  UP:{1000(INNER CLOCK),200}  {DOWN:1000(INNER CLOCK),200}.
