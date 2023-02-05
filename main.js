const equationInput = document.getElementById('equation')
const drawBtn       = document.getElementById('drawBtn')
const clearBtn      = document.getElementById('clearCanvas')
const outputDiv     = document.getElementById('output')
const canvas        = document.getElementById('canvas')

const ctx = canvas.getContext('2d');
const m = math.create(math.all)

const clientWidth   = window.innerWidth;
const clientHeight  = window.innerHeight;

canvas.width     = clientWidth;
canvas.height    = clientHeight;

let graphColors  = ["#000000", "#8D0808", "#03641A", "#00225B", "#5C00B3", "#FF7575", "#1ED1BE",]

let min_X=-10;
let max_X=10;
let min_Y=-8;
let max_Y=8;

let negativeClientAxis__X = -clientWidth/2;
let positiveClientAxis__X =  clientWidth/2;
let negativeClientAxis__Y = -clientHeight/2; 
let positiveClientAxis__Y =  clientHeight/2;

let axisStep_X = positiveClientAxis__X/max_X;
let axisStep_Y = positiveClientAxis__Y/max_Y;


let steps= 0.003;

let graphPoints=[];

drawAxis();

function drawAxis() 
{
  // X axis
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(0,clientHeight/2);
  ctx.lineTo(clientWidth,clientHeight/2 );
  ctx.stroke();

  // Y axis
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(clientWidth/2,0);
  ctx.lineTo(clientWidth/2,clientHeight );
  ctx.stroke();

  // points in x axis
  for(let i = 0; i <= clientWidth; i += axisStep_X ){

    if( Math.round(i) == Math.round(clientWidth/2)){

      continue;

    }

    ctx.fillRect(i-1,clientHeight/2 -4.5, 2,8 );


    ctx.beginPath();
    ctx.lineWidth = 0.2;
    ctx.moveTo( i , 0 );
    ctx.lineTo( i , clientHeight );
    ctx.stroke();
  }

  // points in y axis
  for(let i = 0 ; i <= clientHeight ; i+= axisStep_Y ){

    if( Math.round(i) == Math.round(clientHeight / 2) ){
      
      continue;

    }

  ctx.fillRect(clientWidth/2 -4 , i-1 , 8,2 );


    ctx.beginPath();
    ctx.lineWidth = 0.2;
    ctx.moveTo( 0 , i );
    ctx.lineTo( clientWidth , i );
    ctx.stroke();

  }
}
// let t1= Date.now();

drawBtn.addEventListener('click', () => {

  let equation = equationInput.value 



  if(!equation || !equation.includes("x")  ){

    console.log("value is not valid");

    return;
  }
  
  for(let i = min_X ; i<= max_X; i+=steps)
  {    
    
    let scope = {
      x: i, 
    }

    let result_Y = m.evaluate(equation, scope);

    graphPoints.push({i,result_Y});
    
  }

  drawPoints();

})

clearBtn.addEventListener('click', () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
      
})

function drawPoints()
{

  let temp_X = min_X;

  let scope = {
    x:min_X,
  }

  let equation  = equationInput.value;

  let temp_Y    = m.evaluate(equation, scope) ;


  for (const v of graphPoints) {


  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo((temp_X)*axisStep_X + clientWidth/2 ,-(temp_Y) * axisStep_Y + clientHeight/2 );
  ctx.lineTo(v.i*axisStep_X + clientWidth/2 ,-v.result_Y * axisStep_Y + clientHeight/2 );
  ctx.strokeStyle = graphColors[3] ;
  ctx.stroke();
  

  temp_X = v.i;
  temp_Y = v.result_Y;

  
  }
  graphPoints.length=0;
  // let t2=Date.now();
  // console.log("time it took: ", t2-t1);
}

