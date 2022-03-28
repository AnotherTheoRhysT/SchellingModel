import { canvas, ctx, canvasHeight, canvasWidth, personColor } from "./config.js";

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
var popX, popY

var simGrid = []
var point = {
  entity: 'space',
  status: null
}
var person = {
  entity: 'person',
  status: 'healthy'
}

export function gridInit (grid) {
  for(let i: number = 0; i < canvasWidth; i++) {
    grid[i] = [];
    for(let j: number = 0; j < canvasHeight; j++) {
      grid[i][j] = point;
    }
  }
}

let testI = 0
export function simInit () {
  popInitVal = popInit.value
  // infectInitVal = infectInit.value;

  // For testing
  // 5% of population is infected
  infectInitVal = popInitVal * (5 / 100)
  var healthyPop = popInitVal - infectInitVal
  socDistVal = socDist.value
  areaVal = area.value

  // 65% infection rate

  // Grid Initialization
  gridInit(simGrid)

  console.log(simGrid)
  console.log(infectInitVal)
  console.log(
    'START',
    'popInitVal: ' + popInitVal,
    'infectionInitval: ' + infectInitVal,
    'socDistVal: ' + socDistVal,
    'areaVal: ' + areaVal
  );


  // Spread population
  for (let popIndex = 0; popIndex < popInitVal; popIndex++) {
    popX = Math.round(Math.random() * (canvasWidth - 1))
    popY = Math.round(Math.random() * (canvasHeight - 1))
    if (simGrid[popX][popY].entity != 'person') {
      // Shallow copy will do for now since person doesn't have nested obj
      simGrid[popX][popY] = { ...person }

      if (infectInitVal > 0) {
        simGrid[popX][popY].status = 'infected'
        infectInitVal--
      } 
      ctx.fillStyle = personColor[simGrid[popX][popY].status]
      ctx.fillRect(popX, popY, 1, 1);
    }
  }

  // console.log(
  //   'END',
  //   'popInitVal: ' + popInitVal,
  //   'infectionInitval: ' + infectInitVal,
  //   'socDistVal: ' + socDistVal,
  //   'areaVal: ' + areaVal
  // );
}

export function updateGrid (newGrid) {
  simGrid = newGrid
}

export {
  popInitVal,
  infectInitVal,
  socDistVal,
  areaVal,
  simGrid
}