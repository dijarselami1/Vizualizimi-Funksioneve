// Constant Variabless
const POINT_SIZE = 3
const STEP_SIZE  = 0.005
const FACTOR     = 200;

// HTML elements
const equationInput = document.getElementById('equation')
const drawBtn       = document.getElementById('drawBtn')
const outputDiv     = document.getElementById('output')
const canvas        = document.getElementById('canvas')

// Setup variables
const ctx = canvas.getContext('2d')
const m   = math.create(math.all)
let minX, minY, maxX, maxY, clientWidth, clientHeight
let points = []

const calculateCanvasSize = () => {
  clientWidth  = window.innerWidth;
  clientHeight = window.innerHeight;

  canvas.width  = clientWidth;
  canvas.height = clientHeight;

  minX = -(clientWidth/2);
  maxX =  clientWidth/2;
  minY = -(clientHeight/2);
  maxY =  clientHeight/2;
}

const drawAxis = (ctx) => {
  // Draw X axis
  ctx.beginPath();
  ctx.moveTo(0, clientHeight/2);
  ctx.lineTo(clientWidth, clientHeight/2);
  ctx.stroke();

  // Draw Y axis
  ctx.beginPath();
  ctx.moveTo(clientWidth/2, 0);
  ctx.lineTo(clientWidth/2, clientHeight);
  ctx.stroke();
}

const showPoints = () => {
  for (const p of points) {
    ctx.fillRect(p.x + clientWidth/2 - POINT_SIZE, -p.y + clientHeight/2 - POINT_SIZE, POINT_SIZE, POINT_SIZE);  
  }
}

const resizeCanvas = () => {
  calculateCanvasSize()
  drawAxis(ctx)
  if (points.length > 0) showPoints(points)
}

resizeCanvas()
window.addEventListener("resize", () => {
  resizeCanvas()
})

drawBtn.addEventListener('click', () => {
  let equation = equationInput.value 

  for (let x = minX-1 ; x <= maxX-1; x+=STEP_SIZE)
  {
    if(!equation || !equation.includes("x")) return
    
    let scope = {
      x: x, 
    }

    let y = m.evaluate(equation, scope)

    points.push({x: x*FACTOR, y: y*FACTOR});
  }
  showPoints();
})