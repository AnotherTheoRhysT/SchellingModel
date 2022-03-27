import { canvas, ctx, fps } from "./config.js";
import { popInitVal, infectInitVal, socDistVal, areaVal, simGrid } from "./simInit.js";
import { simStopped } from "./simStop.js";

export function simReset () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var moveX: number, moveY: number
var moveGrid = []
var simReqId
var i = 0, j = 0

function randNum (min: number, max: number): number {
  let range: number = max - min
  let randInit = Math.round(Math.random() * range) + max
  return randInit - range
}

function movePersons () {
  for (let x: number = 0; x < canvas.width; x++) {
    for (let y: number = 0; y < canvas.height; y++) {
      if (simGrid[x][y].entity == 'person') {
        // Move person
        moveX = randNum(-1, 1)
        moveY = randNum(-1, 1)
        // console.log('test')
        // console.log(`X: ${moveX}; Y: ${moveY}`)

        // if (simGrid[moveX][moveY].entity == 'space')
      }
    }
  }
  console.log(`movePerson: ${j++}`)


  // simGrid = moveGrid
}

export function simRun () {

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  movePersons()
  
  setTimeout(() => {
    simReqId = requestAnimationFrame(simRun)
    if (i > 50 || simStopped) cancelAnimationFrame(simReqId)
  }, 1000/fps)
}

export function simTest () {
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