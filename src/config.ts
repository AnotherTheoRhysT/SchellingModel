const canvas = <HTMLCanvasElement> document.getElementById('sim')
const canvasHeight = 500
const canvasWidth = 500
const fps = 1

const personColor = {
  susceptible: '#1753d4', // Blue
  recovered: '#27d618', // Green
  // Infected but not infectious
  infected: '#ffdd00', // Yellow
	dead: '##1c1c1c', // Black

  // Severity
  asymptomatic: '#bd1e9a', // Pink
  mild: '#fc8f00', // Orange
  severe: '#b818b8', // Purple
  critical: '#db1a1a', // Red
  // vaccinated: '#27d618', // Green
  
  
  // infected but not contagious
  // uncontagious: '#bd1e9a' // Pink
  // mild: ,
  // asymptomatic: ,

}


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
