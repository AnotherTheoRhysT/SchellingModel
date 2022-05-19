import { canvas, canvasHeight, canvasWidth, ctx, fps, personColor } from "./config.js";
import { popInitVal, infectInitVal, areaVal, simGrid, updateGrid, emptyGridDeepCopy, dayVal, updateDay, alertLvlVal, betaTransmission, durationVal } from "./simInit.js";
import { simStop } from "./simStop.js";


export const simReset = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  simStop()
}


let moveX: number, moveY: number
let moveGrid = []
let simReqId
let i = 0, j = 0, simRunIteration = 0
let timeOutId
let travelDist
let infectProb
let distProb

const randNum = (min: number, max: number): number => {
  let range: number = max - min
  let randInit = min + Math.round(Math.random() * range)
  return randInit
}


const movePersons = () => {
  // Init moveGrid
  moveGrid = emptyGridDeepCopy()
  for (let x: number = 0; x < canvasWidth; x++) {
    for (let y: number = 0; y < canvasHeight; y++) {
      if (simGrid[x][y].entity == 'person' && simGrid[x][y].status != 'dead' && simGrid[x][y].severity != 'severe' && simGrid[x][y].severity != 'critical') {
        // Move person
        switch (alertLvlVal) {
          case 1:
            travelDist = 5
            break;
          case 2:
            travelDist = 4
            break;
          case 3:
            travelDist = 3
            break;
          case 4:
            travelDist = 2
            break;
          case 5:
            travelDist = 1
            break;
        }
        moveX = x + randNum(travelDist * -1, travelDist)
        moveY = y + randNum(travelDist * -1, travelDist)

        // Constrain movement within the grid
        if (moveX >= 0 && moveX < canvasWidth && moveY >= 0 && moveY < canvasHeight) {
          if (simGrid[moveX][moveY].entity != 'person' && moveGrid[moveX][moveY].entity != 'person') {
            // If point is free; person can move to said point
            moveGrid[moveX][moveY] = { ...simGrid[x][y] }
          } else {
            // If point isn't free; person stays
            moveGrid[x][y] = { ...simGrid[x][y] }
          }
        } else {
          // If it goes beyond the grid, then it stays
          moveGrid[x][y] = { ...simGrid[x][y] }
        }
      } else if (moveGrid[x][y].entity != 'person') {
        // Space
        moveGrid[x][y] = { ...simGrid[x][y] }
      }
    }
  }
}


const isInGrid = (coordinate, axis) => {
  switch (axis) {
    case 'x':
      return (coordinate >= 0 && coordinate < canvasWidth)
    case 'y':
      return (coordinate >= 0 && coordinate < canvasHeight)
  }
}


const infectPersons = () => {
  // Uses moveGrid
  for (let x: number = 0; x < canvasWidth; x++) {
    for (let y: number = 0; y < canvasHeight; y++) {
      // Check surrounding of infected person
      /**
       * * Testing Rules
       * Distance
       * 1px = 80%
       * 2px = 60%
       * 3px = 40%
       * 4px = 20%
       * 
       * Multiplied by betaTransmission value
       */
      if (moveGrid[x][y].status == 'infected') {
        moveGrid[x][y].daysInfect = (moveGrid[x][y].daysInfect + 1) || 1

        // The length of time after exposure before an individual becomes infectious is set by default to be a log-normal distribution with a mean of 4.6 days
        // daysInfect rounded off to flat value of 5 days
        // 
        if (moveGrid[x][y].severity != null) {
          for (let xOffset = -4; xOffset <= 4; xOffset++) {
            let xCoord = x + xOffset
            if (isInGrid(xCoord, 'x')) {
              for (let yOffset = -4; yOffset <= 4; yOffset++) {
                let yCoord = y + yOffset
                if (isInGrid(yCoord, 'y') && moveGrid[xCoord][yCoord].status == 'susceptible' && xCoord != x && yCoord != y) {
                  // distance formula
                  let dist = Math.sqrt((xOffset)**2 + (yOffset)**2)
                  switch (Math.round(dist)) {
                    case 1: 
                      // 1px away = 80% infection rate
                      distProb = 0.8
                      break;
                    case 2:
                      distProb = 0.6
                      break;
                      case 3:
                      distProb = 0.4
                      break;
                    case 4:
                      distProb = 0.2
                      break;
                  }
                  infectProb = distProb * betaTransmission * 35;
                  if (Math.random() <= infectProb) {
                    moveGrid[xCoord][yCoord].status = 'infected'
                    moveGrid[xCoord][yCoord].daysInfect = 1
                  }
                }
              }
            }
          }
        }

        // (https://journals.plos.org/ploscompbiol/article/figure/image?size=large&id=10.1371/journal.pcbi.1009149.t001)
        // Probability of severity

        // Infect to either symptomatic or asymptomatic
        if (moveGrid[x][y].daysInfect == 6) {
          if (Math.random() <= 0.675) {
            moveGrid[x][y].severity = 'mild'
          } else {
            moveGrid[x][y].severity = 'asymptomatic'
          }
        }

        if (moveGrid[x][y].severity == 'mild' && moveGrid[x][y].daysInfect >= 13 && Math.random() <= 0.04554) {
          moveGrid[x][y].severity = 'severe'
        }

        if (moveGrid[x][y].severity == 'severe' && moveGrid[x][y].daysInfect >= 15 && Math.random() <= 0.008227) {
          moveGrid[x][y].severity = 'critical'
        }

        if (moveGrid[x][y].severity == 'critical' && moveGrid[x][y].daysInfect >= 21 && Math.random() <= 0.001955) {
          moveGrid[x][y].status = 'dead'
          moveGrid[x][y].severity = null
        }

        // Recovery Logic
        switch (moveGrid[x][y].severity) {
          case 'asymptomatic':
          case 'mild':
            if (moveGrid[x][y].daysInfect >= 14) recoverPerson(x,y)
            break;
          case 'severe':
            if (moveGrid[x][y].daysInfect >= 31) recoverPerson(x,y)
            break;
          case 'critical':
            if (moveGrid[x][y].daysInfect >= 33) recoverPerson(x,y)
            break;
        }
      }
    }    
  }
}


const recoverPerson = (x,y) => {
  moveGrid[x][y].status = 'recovered'
  moveGrid[x][y].severity = null
  moveGrid[x][y].daysInfect = 0
}


export const updateCanvas = (newGrid) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      if (newGrid[x][y].entity == 'person') {
        if (newGrid[x][y].severity != null) {
          ctx.fillStyle = personColor[simGrid[x][y].severity]
        } else {
          ctx.fillStyle = personColor[simGrid[x][y].status]
        }
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}


export const countPop = (grid): number => {
  let simPopHealth = 0
  for(let x: number = 0; x < canvasWidth; x++) {
    simPopHealth += grid[x].filter( point => point.entity == 'person' ).length
  }
  return simPopHealth
}


export const simRun = () => {

  // EXPORT GRID TO CSV
  // console.log('CSV')
  // if (simRunIteration <= 6) {
  //   var CsvString = "SimGrid\r\n";
    
  //   simGrid.forEach(function(RowItem, RowIndex) {
  //     RowItem.forEach(function(ColItem, ColIndex) {
  //       CsvString += ( (ColItem.entity=='person') ? (ColItem.status=='susceptible'? '1': '2') : '0' ) + ',';
  //     });
  //     CsvString += "\r\n";
  //   });
  //   CsvString += "END"

  //   CsvString += "\r\n\r\nMove Grid\r\n"
  //   moveGrid.forEach(function(RowItem, RowIndex) {
  //     RowItem.forEach(function(ColItem, ColIndex) {
  //       CsvString += ( (ColItem.entity=='person') ? (ColItem.status=='susceptible'? '1': '2') : '0' ) + ',';
  //     });
  //     CsvString += "\r\n";
  //   });
  //   CsvString += "END"

  //   CsvString = "data:application/csv," + encodeURIComponent(CsvString);
  //   var x = document.createElement('a');
  //   x.setAttribute("href", CsvString );
  //   x.setAttribute("download",`Iteration-${simRunIteration}.csv`);
  //   document.body.appendChild(x);
  //   x.click();
  // }


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePersons()
  infectPersons()
  updateGrid(moveGrid)

  updateCanvas(simGrid)


  // Update day counter
  updateDay()

  timeOutId = setTimeout(() => {
    simReqId = requestAnimationFrame(simRun)
    // Stop after
    if (dayVal >= durationVal) cancelAnimationFrame(simReqId)
  }, 1000/fps)
}


export const simTest = () => {
  let testPoint = {
    x: 4,
    y: 4
  }
  let CsvStr = ''
  for (let x = -4; x <= 4; x++) {
    for (let y = -4; y <= 4; y++) {
      let dist = Math.round(Math.sqrt((x)**2 + (y)**2))
      CsvStr += `${dist},`
    }
    CsvStr += "\r\n";
  }


  CsvStr = "data:application/csv," + encodeURIComponent(CsvStr);
  var x = document.createElement('a');
  x.setAttribute("href", CsvStr );
  x.setAttribute("download",`distanceTest1.csv`);
  document.body.appendChild(x);
  x.click();

}


export {
  simReqId,
  timeOutId
}