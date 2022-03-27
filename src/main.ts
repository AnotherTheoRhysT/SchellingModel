import { simRun, simTest, simReset, simReqId } from "./simRun.js";
import { canvas, canvasResize, ctx, ctxStatus, fps } from "./config.js";
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

document.getElementById('simStartBtn').onclick = () => {
  simReset()
  simInit()
  simRun()
}

document.getElementById('simStopBtn').onclick = () => {
  simStop()
}

document.getElementById('testBtn').onclick = () => {
  simTest()
}