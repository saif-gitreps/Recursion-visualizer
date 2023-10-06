import { grid, rowValue, colValue, pathCounter, directionInfo, obstacleInfo } from "./app.js";

export function kev(m, n, row, col) {
   if ((m == row && n == col) || obstacleInfo[m][n] == 1) {
      return;
   }
   if (m < row && obstacleInfo[m + 1][n] != 1) {
      m += 1;
      directionInfo.push({ direction: "down", row: m, col: n });
      kev(m, n, row, col);
      directionInfo.push({ direction: "up", row: m, col: n });
      m -= 1;
   }
   if (n < col && obstacleInfo[m][n + 1] != 1) {
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
