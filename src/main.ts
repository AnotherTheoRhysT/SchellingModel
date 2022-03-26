import { simRun, simTest, simReset } from "./simRun.js";
import { canvas, canvasResize, ctx, ctxStatus } from "./config.js";
import { simInit } from "./simInit.js";

if (!ctxStatus) {
  // Canvas not supported
  console.log('Canvas not supported')
} else {
  // Canvas is supported
  console.log('Canvas is supported')
  canvasResize()
  // simInit()
  // simRun()
}

document.getElementById('simStartBtn').onclick = () => {
  simReset()
  simInit()
  // simRun()
}

document.getElementById('testBtn').onclick = () => {
  simTest()
}