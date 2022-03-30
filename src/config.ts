const canvas = <HTMLCanvasElement> document.getElementById('sim')
const canvasHeight = 100
const canvasWidth = 100
const fps = 1

const personColor = {
  healthy: '#27d618',
  infected: '#de1b1b'
}

// export function updateCtxPx () {
//   ctx.fillStyle = personColor.infected
// }

let ctx = null
let ctxStatus = false
  
if (canvas.getContext) {
  ctx = canvas.getContext('2d')
  ctxStatus = true;
}

export const canvasResize = () => {
  canvas.height = canvasHeight
  canvas.width = canvasWidth
}

export {
  canvas,
  ctx,
  ctxStatus,
  canvasHeight,
  canvasWidth,
  personColor,
  fps
}
