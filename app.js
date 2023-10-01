const rowInput = document.getElementById("row-input");
const colInput = document.getElementById("col-input");
const enterButton = document.getElementById("enter-button");
const grid = document.querySelector("main ul");
const simulateButton = document.getElementById("simulate-button");
const firstBlockElement = document.createElement("div");
const counterDiv = document.getElementById("path-counter");
const pathCounter = document.querySelector("#path-counter .boxes");

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
   firstBlockElement.style.backgroundColor = "green";
   grid.appendChild(firstBlockElement);
}

enterButton.addEventListener("click", () => {
   directionInfo = [];
   pathCounter.value = 0;
   rowValue = parseInt(rowInput.value);
   colValue = parseInt(colInput.value);
   gridSizeAdjustment(rowValue, colValue);
   initialBlock();
   simulateButton.style.display = "block";
});

let ans = 0;

function kev(m, n, row, col) {
   if (m == row && n == col) {
      ans++;
      // directionInfo.push({ direction: "reached", row: m, col: n });
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
   let pathCountVariable = 1;
   for (let i = 0; i < directionInfo.length; i++) {
      setTimeout(() => {
         if (directionInfo[i].direction == "down" || directionInfo[i].direction == "right") {
            const block = document.createElement("div");
            block.style.gridRowStart = directionInfo[i].row;
            block.style.gridColumnStart = directionInfo[i].col;
            block.classList.add("block");
            if (directionInfo[i].row == rowValue && directionInfo[i].col == colValue) {
               block.style.backgroundColor = "#ADD8E6";
               pathCounter.value = pathCountVariable++;
            }
            grid.appendChild(block);
         } else if (directionInfo[i].direction === "left" || directionInfo[i].direction === "up") {
            const rowToFind = directionInfo[i].row;
            const colToFind = directionInfo[i].col;
            const blockToDelete = grid.querySelector(
               `.block[style*="grid-row-start: ${rowToFind}; grid-column-start: ${colToFind};"]`
            );
            if (blockToDelete) {
               blockToDelete.classList.remove("block");
               grid.removeChild(blockToDelete);
            }
         }
      }, 200 * (i + 1));
   }
}

simulateButton.addEventListener("click", () => {
   ans = 0;
   kev(1, 1, rowValue, colValue);
   counterDiv.style.display = "flex";
   // for debugging purposes.
   for (let i = 0; i < directionInfo.length; i++) {
      console.log(directionInfo[i]);
   }
   draw();
   simulateButton.style.display = "none";
});
