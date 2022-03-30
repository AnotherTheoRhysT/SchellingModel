import { simRun, simTest, simReset, simReqId } from "./simRun.js";
import { canvas, canvasHeight, canvasResize, canvasWidth, ctx, ctxStatus, fps } from "./config.js";
import { simInit } from "./simInit.js";
import { simStop } from "./simStop.js";


if (!ctxStatus) {
  // Canvas not supported
  console.log('Canvas not supported')
} else {
  // Canvas is supported
  console.log('Canvas is supported')
  canvasResize()
}


// For Testing
(<HTMLInputElement>document.getElementById('popInit')).value =  String(canvasHeight * canvasWidth / 2)


document.getElementById('simStartBtn').onclick = () => {
  simReset()
  simInit()
  setTimeout(() => {
    simRun()
  }, 1000/fps)
}


document.getElementById('simStopBtn').onclick = () => {
  simStop()
}


document.getElementById('testBtn').onclick = () => {
  simTest()
}