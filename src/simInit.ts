import { canvas, ctx, canvasHeight, canvasWidth, personColor } from "./config.js";
import { countPop } from "./simRun.js";


const popInit = <HTMLInputElement> document.getElementById("popInit"),
  infectInit = <HTMLInputElement> document.getElementById("infectInit"),
  // socDist = <HTMLInputElement> document.getElementById("socDist"),
  area = <HTMLInputElement> document.getElementById("area"),
  day = <HTMLInputElement> document.getElementById("dayCounter")


let popInitVal,
  infectInitVal,
  areaVal,
  popX, popY,
  simPopHealth,
  alertLvl,
  alertLvlVal,
  dayVal,
  betaTransmission

let simGrid = []
let emptyGrid = []
const point = {
  entity: 'space',
  status: null,
  severity: null,
  daysInfect: 0
}
const person = {
  entity: 'person',
  status: 'susceptible',
  severity: null,
  daysInfect: 0
}


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
  alertLvl = <HTMLInputElement> document.querySelector("input[name=alertLvl]:checked")
  popInitVal = popInit.value
  infectInitVal = infectInit.value;
  alertLvlVal = Number(alertLvl.value)

  // Beta transmission rate values based on np.linspace(0.010, 0.020, 5) in CovasimBenchmark.ipnyb
  switch (alertLvlVal) {
    case 1:
      betaTransmission = 0.02
      break;
    case 2:
      betaTransmission = 0.0175
      break;
    case 3:
      betaTransmission = 0.015
      break;
    case 4:
      betaTransmission = 0.0125
      break;
    case 5:
      betaTransmission = 0.01
      break;
  }
  console.log(`AlertLvl: ${alertLvlVal}; Beta: ${betaTransmission}`)
  day.value = String(0)
  dayVal = day.value
  updateDay()

  let healthyPop = popInitVal - infectInitVal
  areaVal = area.value

  // Grid Initialization
  console.log("---SIM INIT---")
  emptyGridInit()
  simGrid = emptyGridDeepCopy()


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

}


export const updateGrid = (newGrid) => {
  simGrid = JSON.parse(JSON.stringify(newGrid))
  // simGrid = JSON.parse(JSON.stringify(newGrid))
  // console.log(`Updated Grid: ${countPop(simGrid)}`)
}

export const copyEmptyGrid = () => {
  JSON.parse
}

export const updateDay = () => {
  day.value = String(++dayVal)
}


export {
  popInit,
  popInitVal,
  infectInitVal,
  areaVal,
  simGrid,
  alertLvlVal,
  dayVal,
  betaTransmission
}