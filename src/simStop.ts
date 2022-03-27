import { simReqId } from "./simRun.js"

var simStopped = false

export function simStop () {
  cancelAnimationFrame(simReqId)
  // Added stop guard in case setTimeout prevent cancelAnimationFrame from working
  simStopped = true
}

export {
  simStopped
}