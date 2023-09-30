const rowInput = document.getElementById("row-input");
const colInput = document.getElementById("col-input");
const enterButton = document.getElementById("enter-button");
const grid = document.querySelector("main ul");
const simulateButton = document.getElementById("simulate-button");
const firstBlockElement = document.createElement("div");

let rowValue = rowInput.value;
let colValue = colInput.value;

let directionInfo = [];

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
      directionInfo.push({ direction: "down", row: m, col: n });
      kev(m, n, row, col);
      directionInfo.push({ direction: "up", row: m, col: n });
      m -= 1;
   }
   if (n < col) {
      n += 1;
      directionInfo.push({ direction: "right", row: m, col: n });
      kev(m, n, row, col);
      directionInfo.push({ direction: "left", row: m, col: n });
      n -= 1;
   }
}

function draw() {
   for (let i = 0; i < directionInfo.length; i++) {
      if (directionInfo[i].direction == "down" || directionInfo[i].direction == "right") {
         const block = document.createElement("div");
         block.style.gridRowStart = directionInfo[i].row;
         block.style.gridColumnStart = directionInfo[i].col;
         block.classList.add("block");
         grid.appendChild(block);
      } else if (directionInfo[i].direction === "left" || directionInfo[i].direction === "up") {
         const rowToFind = directionInfo[i].row;
         const colToFind = directionInfo[i].col;
         console.log(`Searching for row ${rowToFind}, col ${colToFind}`);
         const blockToDelete = grid.querySelector(
            `.block[style*="grid-row-start: ${rowToFind}; grid-column-start: ${colToFind};"]`
         );
         console.log(blockToDelete);
         if (blockToDelete) {
            blockToDelete.classList.remove("block");
            grid.removeChild(blockToDelete);
         }
      }
   }
}

simulateButton.addEventListener("click", () => {
   grid.removeChild(firstBlockElement);
   kev(1, 1, rowValue, colValue);
   // for debugging purposes.
   for (let i = 0; i < directionInfo.length; i++) {
      console.log(directionInfo[i]);
   }
   draw();
});
