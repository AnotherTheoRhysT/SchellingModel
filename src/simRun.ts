import { canvas, canvasHeight, canvasWidth, ctx, fps, personColor } from "./config.js";
import { popInitVal, infectInitVal, socDistVal, areaVal, simGrid, updateGrid, emptyGridDeepCopy } from "./simInit.js";
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
      if (simGrid[x][y].entity == 'person') {
        // Move person
        moveX = x + randNum(-1, 1)
        moveY = y + randNum(-1, 1)

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


export const updateCanvas = (newGrid) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      if (newGrid[x][y].entity == 'person')
      ctx.fillStyle = personColor[simGrid[x][y].status]
      ctx.fillRect(x, y, 1, 1);
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
  console.log(`Iteration: ${simRunIteration++}; simRun: ${countPop(simGrid)}`)
  movePersons()

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
  console.log(simGrid)
  updateGrid(moveGrid)
  console.log(simGrid)

  // if (simRunIteration%2) {
    
  // }
    
  updateCanvas(simGrid)

  timeOutId =  setTimeout(() => {
    simReqId = requestAnimationFrame(simRun)
    // console.log('simStopped', simStopped)
    if (i > 10) cancelAnimationFrame(simReqId)
  }, 1000/fps)
}


let testX = 0, testY = 0
export const simTest = () => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.fillRect(testX++, testY++, 1, 1)

  // timeOutId =  setTimeout(() => {
  //   simReqId = requestAnimationFrame(simTest)
  //   // console.log('simStopped', simStopped)
  //   if (i > 50) cancelAnimationFrame(simReqId)
  // }, 1000/fps)
}


export {
  simReqId,
  timeOutId
}