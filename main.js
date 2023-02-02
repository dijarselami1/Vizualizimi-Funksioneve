const equationInput = document.getElementById('equation')
const drawBtn       = document.getElementById('drawBtn')
const outputDiv     = document.getElementById('output')
const canvas        = document.getElementById('canvas')

const ctx = canvas.getContext('2d');
const m = math.create(math.all)

const clientWidth  = window.innerWidth;
const clientHeight = window.innerHeight;

canvas.width  = clientWidth;
canvas.height = clientHeight;

let min_X=-20;
let max_X=20;
let min_Y=-5;
let max_Y=5;

let axis_Zero;

// X axis
ctx.beginPath();
ctx.moveTo(0,clientHeight/2);
ctx.lineTo(clientWidth,clientHeight/2 );
ctx.stroke();
// Y axis
ctx.beginPath();
ctx.moveTo(clientWidth/2,0);
ctx.lineTo(clientWidth/2,clientHeight );
ctx.stroke();

let steps= 0.0003;

let graphPoints=[];

drawBtn.addEventListener('click', () => {
  let equation = equationInput.value 

  for(let i = min_X-1 ; i<= max_X-1; i+=1)
  {
    
    if(!equation || !equation.includes("x")  ){

      console.log("value is not valid");

      return;
    }
    
    let scope = {
      x: i, 
    }

    let result_Y = m.evaluate(equation, scope)
    graphPoints.push({i,result_Y});
    
  }
  showPoints();
})

function showPoints()
{

  for (const v of graphPoints) {
    console.log(v.i + ", " + v.result_Y);
    ctx.fillRect(v.i +clientWidth/2 ,-v.result_Y + clientHeight/2 ,2,2);  
  }

}