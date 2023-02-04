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

let negativeClientAxis__X = -clientWidth/2;
let positiveClientAxis__X =  clientWidth/2;
let negativeClientAxis__Y = -clientHeight/2; 
let positiveClientAxis__Y =  clientHeight/2;

let axisStep_X = positiveClientAxis__X/max_X;
let axisStep_Y = positiveClientAxis__Y/max_Y;

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

// points in x axis
for(let i =0; i<=clientWidth; i+=axisStep_X ){
    if(i== clientWidth/2){
      continue;
    }
  ctx.fillRect(i,clientHeight/2, 2,5 );
}

// points in y axis
for(let i =0; i<=clientHeight; i+=axisStep_Y ){
  if(i== clientHeight/2){
    continue;
  }
ctx.fillRect(clientWidth/2,i, 5,2 );
}

console.log("clientwidht: " + clientWidth); 


let steps= 0.03;

let graphPoints=[];

drawBtn.addEventListener('click', () => {
  let equation = equationInput.value 

  for(let i = min_X ; i<= max_X; i+=steps)
  {
    
    if(!equation || !equation.includes("x")  ){

      console.log("value is not valid");

      return;
    }
    
    let scope = {
      x: i, 
    }

    let result_Y = m.evaluate(equation, scope);
    graphPoints.push({i,result_Y});
    
  }
  showPoints();
})

function showPoints()
{

  for (const v of graphPoints) {
    console.log(v.i + ", " + v.result_Y);

    ctx.fillRect(v.i*axisStep_X +clientWidth/2 -1 ,-v.result_Y * axisStep_Y + clientHeight/2 -1 ,2,2);  
  }

}