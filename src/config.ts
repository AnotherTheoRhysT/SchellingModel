var canvas = <HTMLCanvasElement> document.getElementById('sim')
var canvasHeight = 850
var canvasWidth = 850

var ctx = null
var ctxStatus = false
  
if (canvas.getContext) {
  ctx = canvas.getContext('2d')
  ctxStatus = true;
}

export {
  canvas,
  ctx,
  ctxStatus,
  canvasHeight,
  canvasWidth
}

export function canvasResize () {
  canvas.height = canvasHeight
  canvas.width = canvasWidth
}