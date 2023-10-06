import { grid, rowValue, colValue, directionInfo, firstBlockElement } from "./app.js";

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
         const occupiedBlock = grid.querySelector(
            `.preBlocks[style*="grid-row-start: ${i}; grid-column-start: ${j};"]`
         );
         if (occupiedBlock) {
            grid.removeChild(occupiedBlock);
         }
         block.classList.add("preBlocks");
         grid.appendChild(block);
      }
   }
}
export function removeObstacles() {
   for (let i = 1; i <= rowValue; i++) {
      for (let j = 1; j <= colValue; j++) {
         if (i == 1 && j == 1) {
            continue;
         }
         const obstacleBlock = grid.querySelector(
            `.obstacle[style*="grid-row-start: ${i}; grid-column-start: ${j};"]`
         );
         if (obstacleBlock) {
            obstacleBlock.classList.remove("obstacle");
         }
      }
   }
}
