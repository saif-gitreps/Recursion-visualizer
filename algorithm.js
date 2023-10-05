import { grid, rowValue, colValue, pathCounter, directionInfo, firstBlockElement } from "./app.js";

export function reduceWidth(width) {
   if (width > 45 && width < 60) {
      width = width - width * (1 / 3);
   } else if (width > 60) {
      width = width - width * (1 / 2);
   }
   return width;
}
export function reduceHeight(height) {
   if (height > 45 && height < 60) {
      height = height - height * (1 / 3);
   } else if (height > 60) {
      height = height - height * (1 / 2);
   }
   return height;
}

export function gridSizeAdjustment(rowValue, colValue) {
   grid.style.gridTemplateRows = "repeat(" + rowValue + ", 1fr)";
   grid.style.gridTemplateColumns = "repeat(" + colValue + ", 1fr)";
   grid.style.display = "grid";
   let widthValue = reduceWidth(5 * colValue);
   let heightValue = reduceHeight(5 * rowValue);
   grid.style.width = widthValue + "rem";
   grid.style.height = heightValue + "rem";
}
export function initialBlock() {
   firstBlockElement.style.gridRowStart = 1;
   firstBlockElement.style.gridColumnStart = 1;
   firstBlockElement.classList.add("block");
   firstBlockElement.style.backgroundColor = "green";
   grid.appendChild(firstBlockElement);
}

export function addSubBlocks() {
   for (let i = 1; i <= rowValue; i++) {
      for (let j = 1; j <= colValue; j++) {
         if ((i == 1 && j == 1) || (i == rowValue && j == colValue)) {
            continue;
         }
         const block = document.createElement("div");
         block.style.gridRowStart = i;
         block.style.gridColumnStart = j;
         block.classList.add("preBlocks");
         grid.appendChild(block);
      }
   }
}

export function kev(m, n, row, col) {
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

export function draw() {
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
