import { reduceHeight, reduceWidth, gridSizeAdjustment, kev, draw, initialBlock } from "./algorithm.js";

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
});

simulateButton.addEventListener("click", () => {
   kev(1, 1, rowValue, colValue);
   counterDiv.style.display = "flex";
   draw();
   simulateButton.style.display = "none";
});
