import {
   reduceHeight,
   reduceWidth,
   gridSizeAdjustment,
   kev,
   draw,
   initialBlock,
   addSubBlocks,
} from "./algorithm.js";

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

enterButton.addEventListener("click", () => {
   directionInfo = [];
   pathCounter.value = 0;
   rowValue = parseInt(rowInput.value);
   colValue = parseInt(colInput.value);
   gridSizeAdjustment(rowValue, colValue);
   initialBlock();
   simulateButton.style.display = "block";
   addSubBlocks();
});

grid.addEventListener("click", (event) => {
   const rect = grid.getBoundingClientRect();
   const clickX = event.clientX - rect.left;
   const clickY = event.clientY - rect.top;

   console.log(rowValue);
   console.log(colValue);
   const row = Math.floor((clickY / rect.height) * rowValue) + 1;
   const col = Math.floor((clickX / rect.width) * colValue) + 1;
   console.log(`Clicked grid cell: Row ${row}, Column ${col}`);
   const obstacleBlock = grid.querySelector(
      `.preBlocks[style*="grid-row-start: ${row}; grid-column-start: ${col};"]`
   );
   console.log(obstacleBlock);
   if (obstacleBlock) {
      obstacleBlock.classList.remove("preBlocks");
      obstacleBlock.classList.add("obstacle");
   }
});

simulateButton.addEventListener("click", () => {
   kev(1, 1, rowValue, colValue);
   counterDiv.style.display = "flex";
   draw();
   simulateButton.style.display = "none";
});
