import { canvas, ctx, canvasHeight, canvasWidth, personColor } from "./config.js";
import { countPop } from "./simRun.js";


const popInit = <HTMLInputElement> document.getElementById("popInit"),
  infectInit = <HTMLInputElement> document.getElementById("infectInit"),
  socDist = <HTMLInputElement> document.getElementById("socDist"),
  area = <HTMLInputElement> document.getElementById("area")

let popInitVal
// infectInitVal = infectInit.value;

// For testing
let infectInitVal
let socDistVal
let areaVal
let popX, popY
let simPopHealth

let simGrid = []
let emptyGrid = []
const point = {
  entity: 'space',
  status: null
}
const person = {
  entity: 'person',
  status: 'susceptible'
}


// export const gridInit = (grid) => {
//   // grid = []
//   for(let i: number = 0; i < canvasWidth; i++) {
//     grid[i] = [];
//     for(let j: number = 0; j < canvasHeight; j++) {
//       grid[i][j] = { ...point };
//     }
//   }
//   console.log(`Grid init count: ${countPop(grid)}`)
// }

const emptyGridInit = () => {
  for(let i: number = 0; i < canvasWidth; i++) {
    emptyGrid[i] = [];
    for(let j: number = 0; j < canvasHeight; j++) {
      emptyGrid[i][j] = { ...point };
    }
  }
}

export const emptyGridDeepCopy = () => {
  return JSON.parse(JSON.stringify(emptyGrid))
}


let testI = 0
export const simInit = () => {
  // console.log('start', simGrid, 'person', person)
  popInitVal = popInit.value
  // infectInitVal = infectInit.value;

  // For testing
  // 5% of population is infected
  infectInitVal = popInitVal * (5 / 100)
  let healthyPop = popInitVal - infectInitVal
  socDistVal = socDist.value
  areaVal = area.value

  // 65% infection rate

  // Grid Initialization
  // console.log('preInit', simGrid, 'person', person)
  console.log("---SIM INIT---")
  emptyGridInit()
  simGrid = emptyGridDeepCopy()
  // console.log('postInit', simGrid, 'person', person)

  // console.log(simGrid)
  // console.log(infectInitVal)
  // console.log(
  //   'START',
  //   'popInitVal: ' + popInitVal,
  //   'infectionInitval: ' + infectInitVal,
  //   'socDistVal: ' + socDistVal,
  //   'areaVal: ' + areaVal
  // );


  // Spread population
  // console.log('spread')
  for (let popIndex = 0; popIndex < popInitVal;) {
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
      popIndex++;
    }
  }

  console.log(`SPREAD INIT: ${countPop(simGrid)}`)
  // console.log(
  //   'END',
  //   'popInitVal: ' + popInitVal,
  //   'infectionInitval: ' + infectInitVal,
  //   'socDistVal: ' + socDistVal,
  //   'areaVal: ' + areaVal
  // );
}


export const updateGrid = (newGrid) => {
  simGrid = JSON.parse(JSON.stringify(newGrid))
  // simGrid = JSON.parse(JSON.stringify(newGrid))
  // console.log(`Updated Grid: ${countPop(simGrid)}`)
}

export const copyEmptyGrid = () => {
  JSON.parse
}


export {
  popInitVal,
  infectInitVal,
  socDistVal,
  areaVal,
  simGrid
}