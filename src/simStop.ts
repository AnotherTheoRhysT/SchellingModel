import { simReqId, timeOutId } from "./simRun.js"


export const simStop = () => {
  cancelAnimationFrame(simReqId)
  clearTimeout(timeOutId)
  // Added stop guard in case setTimeout prevent cancelAnimationFrame from working
  // simStopped = true
}