const canvas = <HTMLCanvasElement> document.getElementById('sim')
const canvasHeight = 10
const canvasWidth = 10
const fps = 1

const personColor = {
  susceptible: '#1753d4', // Blue
  vaccinated: '#27d618', // Green
  infected: '#de1b1b', // Red
	dead: '#69402f', // Brown
  // infected but not contagious
  uncontagious: '#bd1e9a' // Pink
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
