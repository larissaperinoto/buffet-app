#!/bin/node

let plateWeight = 0;
let maxFood = 1000;
let minFood = 100;

let place = "place";
let placed = "placed";
let withoutPlate = "withoutPlate";
let state = withoutPlate;

let foodWeight = -1;

function changeState() {
  switch (state) {
    case withoutPlate:
      state = place;
      break;
    case place:
      foodWeight = minFood + Math.random() * maxFood;
      state = placed;
      break;
    case placed:
      state = withoutPlate;
      break;
  }
}

function readScale() {
  if (state == place) {
    return plateWeight + Math.random() * foodWeight;
  }

  if (state == placed) {
    return plateWeight + foodWeight;
  }

  if (state === withoutPlate) {
    return Math.random() * 0.01;
  }
}

function writeWeight() {
  let weight = readScale();
  let msg = `${weight}`;
  console.log(msg);
}

setInterval(changeState, 5000);
setInterval(writeWeight, 500);
