import { canvas, ctx, canvasHeight, canvasWidth } from "./config.js";

var popInit = document.getElementById("popInit"),
infectInit = document.getElementById("infectInit"),
socDist = document.getElementById("socDist"),
area = document.getElementById("area")

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