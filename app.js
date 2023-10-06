import {
   reduceHeight,
   reduceWidth,
   gridSizeAdjustment,
   initialBlock,
   addSubBlocks,
   removeObstacles,
} from "./grid-config.js";

import { kev, draw } from "./algorithm.js";

const rowInput = document.getElementById("row-input");
const colInput = document.getElementById("col-input");
const enterButton = document.getElementById("enter-button");
const simulateButton = document.getElementById("simulate-button");
const counterDiv = document.getElementById("path-counter");

export const firstBlockElement = document.createElement("div");
export const pathCounter = document.querySelector("#path-counter .boxes");
export const grid = document.querySelector("main ul");
export let rowValue = rowInput.value;
export let colValue = colInput.value;
export let directionInfo = [];
export let obstacleInfo = [];

enterButton.addEventListener("click", () => {
   directionInfo = [];
   pathCounter.value = 0;
   rowValue = parseInt(rowInput.value);
   colValue = parseInt(colInput.value);
   for (let i = 1; i <= rowValue; i++) {
      obstacleInfo[i] = [];
   }
   gridSizeAdjustment(rowValue, colValue);
   initialBlock();
   addSubBlocks();
   removeObstacles();
   simulateButton.style.display = "block";
});

grid.addEventListener("click", (event) => {
   const rect = grid.getBoundingClientRect();
   const clickX = event.clientX - rect.left;
   const clickY = event.clientY - rect.top;
   const row = Math.floor((clickY / rect.height) * rowValue) + 1;
   const col = Math.floor((clickX / rect.width) * colValue) + 1;
   obstacleInfo[row][col] = 1;
   const obstacleBlock = grid.querySelector(
      `.preBlocks[style*="grid-row-start: ${row}; grid-column-start: ${col};"]`
   );
   if (obstacleBlock) {
      obstacleBlock.classList.remove("preBlocks");
      obstacleBlock.classList.add("obstacle");
   }
});

simulateButton.addEventListener("click", () => {
   counterDiv.style.display = "flex";
   simulateButton.style.display = "none";
   kev(1, 1, rowValue, colValue);
   draw();
});
