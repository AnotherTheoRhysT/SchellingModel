import { simReqId } from "./simRun.js"

let simStopped = false

export const simStop = () => {
  cancelAnimationFrame(simReqId)
  // Added stop guard in case setTimeout prevent cancelAnimationFrame from working
  simStopped = true
}

export const toggleSimStopped = () => {
  simStopped = !simStopped
}

export {
  simStopped
}