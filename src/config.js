var canvas = document.getElementById('sim')
var canvasHeight = 850
var canvasWidth = 850

var ctx = (!canvas.getContext)
  ? false
  : canvas.getContext('2d')

export {
  canvas,
  ctx,
  canvasHeight,
  canvasWidth
}

export function canvasResize () {
  canvas.height = canvasHeight
  canvas.width = canvasWidth
}