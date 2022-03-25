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

export function simInit() {
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
  for(var i: number = 0; i < canvasWidth; i++) {
    simGrid[i] = [];
    for(var j: number = 0; j < canvasHeight; j++) {
      simGrid[i][j] = point;
    }
  }

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
      simGrid[popX][popY] = person
      if (infectInitVal > 0) {
        simGrid[popX][popY].status = 'infected'
        infectInitVal--
        ctx.fillStyle = personColor.infected
        ctx.fillRect(popX, popY, 1, 1);
      } else {
        ctx.fillStyle = personColor.healthy
        ctx.fillRect(popX, popY, 1, 1);
      }
    }
  }

  console.log(simGrid)



  console.log(
    'END',
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