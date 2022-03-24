import { canvas, ctx } from "./config.js";
import { popInitVal, infectInitVal, socDistVal, areaVal } from "./simInit.js";

var i = 0

export function simReset () {
  i = 0;
}

export function simRun () {
  requestAnimationFrame(simRun)
  // i=0
  // while (i<1000) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(i, i, 2, 2);
  i++
  // ctx.strokeRect(50, 50, 50, 50);
  // if (i <= 1000) i = 0
  // }
}

// var test[50][50]

export function simTest() {
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