import { simRun, simTest, simReset } from "./simRun.js";
import { canvasResize, ctx } from "./config.js";
import { simInit } from "./simInit.js";

if (!ctx) {
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
  simRun()
}

document.getElementById('testBtn').onclick = () => {
  simTest()
}