import { canvas, ctx, canvasHeight, canvasWidth } from "./config.js";

var popInit = <HTMLInputElement> document.getElementById("popInit"),
infectInit = <HTMLInputElement> document.getElementById("infectInit"),
socDist = <HTMLInputElement> document.getElementById("socDist"),
area = <HTMLInputElement> document.getElementById("area")

var popInitVal
// infectInitVal = infectInit.value;

// For testing
var infectInitVal
var socDistVal
var areaVal
var popArr, popX, popY

export function simInit() {
  popInitVal = popInit.value
  // infectInitVal = infectInit.value;

  // For testing
  infectInitVal = popInitVal * (5 / 100)
  socDistVal = socDist.value
  areaVal = area.value

  // 65% infection rate

  // Initialization 

  // Spread population
  for (let popIndex = 0; popIndex < popInitVal; popIndex++) {
    popX = Math.round(Math.random() * canvasWidth)
    popY = Math.round(Math.random() * canvasHeight)
  }


  console.log(
    'popInitVal: ' + popInitVal,
    'infectionInitval: ' + infectInitVal,
    'socDistVal: ' + socDistVal,
    'areaVal: ' + areaVal
  );
}

export {
  popInitVal,
  infectInitVal,
  socDistVal,
  areaVal
}