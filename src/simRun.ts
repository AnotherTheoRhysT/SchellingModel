import { canvas, canvasHeight, canvasWidth, ctx, fps, personColor } from "./config.js";
import { popInitVal, infectInitVal, socDistVal, areaVal, simGrid, updateGrid, gridInit } from "./simInit.js";
import { simStopped, toggleSimStopped } from "./simStop.js";

export function simReset () {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  toggleSimStopped()
}

var moveX: number, moveY: number
var moveGrid = []
var simReqId
var i = 0, j = 0

function randNum (min: number, max: number): number {
  let range: number = max - min
  let randInit = min + Math.round(Math.random() * range)
  return randInit
}

function movePersons () {
  // Init moveGrid
  gridInit(moveGrid)
  // console.log(moveGrid)
  // console.log(`width: ${canvasWidth}; height: ${canvasHeight}`)
  for (let x: number = 0; x < canvasWidth; x++) {
    for (let y: number = 0; y < canvasHeight; y++) {
      if (simGrid[x][y].entity == 'person') {
        // Move person
        moveX = x + randNum(-1, 1)
        moveY = y + randNum(-1, 1)

        
        // Constrain movement within the grid
        if (moveX >= 0 && moveX < canvasWidth && moveY >= 0 && moveY < canvasHeight) {
          if (simGrid[moveX][moveY].entity == 'space') {
            moveGrid[moveX][moveY] = simGrid[x][y]
          } else {
            moveGrid[x][y] = simGrid[x][y]
          }  
        }
      } else {
        moveGrid[x][y] = simGrid[x][y]
      }
    }
  }
  console.log(`movePerson: ${j++}`)


  updateGrid(moveGrid)
  // console.log(simGrid)
  // console.log(moveGrid[50][50])
}

export function updateCanvas (newGrid) {
  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      if (newGrid[x][y].entity == 'person')
      ctx.fillStyle = personColor[simGrid[x][y].status]
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

export function simRun () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  movePersons()
  updateCanvas(simGrid)

  setTimeout(() => {
    simReqId = requestAnimationFrame(simRun)
    if (i > 50 || simStopped) cancelAnimationFrame(simReqId)
  }, 1000/fps)
}

export function simTest () {
  for (let i = 0; i < 50; i++) {
    console.log(randNum(-1, 1))
  }
  console.log(personColor['infected'], personColor.infected)
  // test[1][1] = 'test'
  // console.log(test)

  // for (let index = 0; index < 100; index++) {
  //   console.log(Math.round(Math.random() * 850))
  // }

  // console.log(
  //   'popInitVal: ' + popInitVal,
  //   'infectionInitval: ' + infectInitVal,
  //   'socDistVal: ' + socDistVal,
  //   'areaVal: ' + areaVal
  // );
}

export {
  simReqId
}