
const equationInput   = document.getElementById('equation')
const drawBtn         = document.getElementById('drawBtn')
const clearBtn        = document.getElementById('clearCanvas')
const outputDiv       = document.getElementById('output')
const canvas          = document.getElementById('canvas')
const graphedFnDiv    = document.getElementById('graphedFunctions')
const showDiv         = document.getElementById('show')

const ctx = canvas.getContext('2d');
const m = math.create(math.all)

const clientWidth   = window.innerWidth;
const clientHeight  = window.innerHeight;

canvas.width     = clientWidth;
canvas.height    = clientHeight;

let graphColors  = ["#000000", "#8D0808", "#03641A", "#00225B", "#5C00B3", "#FF7575", "#1ED1BE",]

let min_X=-10;
let max_X=10;
let min_Y=-5;
let max_Y=5;

let negativeClientAxis__X = -clientWidth/2;
let positiveClientAxis__X =  clientWidth/2;
let negativeClientAxis__Y = -clientHeight/2; 
let positiveClientAxis__Y =  clientHeight/2;

let axisStep_X = positiveClientAxis__X/max_X;
let axisStep_Y = positiveClientAxis__Y/max_Y;


let steps= 0.001;

let graphPoints=[];

drawAxis();

function drawAxis() 
{
  // X axis
  graphColors[0];
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
  for(let i= 0 ; i <= clientWidth ; i += axisStep_X ){

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

  drawBtn.addEventListener('click', () => {
    let t1= Date.now();

    let vleraExtremeMax =-Infinity;
    let vleraExtremeMin = Infinity;

    let equation = equationInput.value; 

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

      if(result_Y<vleraExtremeMin )
      {
        vleraExtremeMin=result_Y;
        
      }
      else if(result_Y>vleraExtremeMax && result_Y < max_X){
        vleraExtremeMax=result_Y;
      }
      
    }
    if(vleraExtremeMax+1 > max_X )
    {
      vleraExtremeMax=null;
    }
    else if(vleraExtremeMin-1 <min_Y)
    {
      vleraExtremeMin=null;
    }
    drawPoints(t1);
    // CiftTek();

    show(vleraExtremeMax,vleraExtremeMin);
  })

  
clearBtn.addEventListener('click', () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawAxis();
})

function drawPoints()
{
  let prev_X = min_X;

  let scope = {
    x:min_X,
  }

  let equation  = equationInput.value;

  let prev_Y    = m.evaluate(equation, scope) ;


  for (const v of graphPoints) {

    if(v.result_Y > max_Y*10 || v.result_Y < min_Y*10 ){
      prev_X = v.i;
      prev_Y = v.result_Y;
      continue;
    }
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo((prev_X)*axisStep_X + clientWidth/2 ,-(prev_Y) * axisStep_Y + clientHeight/2 );
  ctx.lineTo(v.i*axisStep_X + clientWidth/2 ,-v.result_Y * axisStep_Y + clientHeight/2 );
  ctx.strokeStyle = graphColors[0] ;
  ctx.stroke();
  

  prev_X = v.i;
  prev_Y = v.result_Y;

  
  }
  graphPoints.length=0;
}

function CiftTek()
{
  let equation = equationInput.value;
  let isCift    = 0;
  let isTek     = 0;
  let isNeither = 0;
  
  for(let i = 1 ; i<=10 ; i++)
  {
    let scope = {
      x: i, 
    }
    let scope2=
    {
      x:-i,
    }
    
    let result_Y = m.evaluate(equation, scope);
    let result_Yminus = m.evaluate(equation, scope2)
    // console.log("e para: "+ result_Y+ "  e dyta: "+result_Yminus)

    if( result_Y == result_Yminus)
    {
      isCift++;

    }else if( -result_Y == result_Yminus){

      isTek++;

    }else{

      isNeither++;

    }
  }
  if(isCift> isTek && isCift > isNeither)
  {
    return "funksioni eshte cift";
  }
  else if(isTek> isCift && isTek > isNeither)
  {
    return "funksioni eshte tek"
  }
  else 
    return ("funksioni seshte as cift as tek");

}

function Zerot()
{

  let equation = equationInput.value;
  let zeroXArr=[];
  let zeroY=[];
  let temp=1313; 
  let tempY=31321
  for(let i = min_X ; i<= max_X ; i+= 0.001)
  {
    let scope = {
      x: i, 
    }

    let result_Y =  m.evaluate(equation, scope);
 
    if(Math.floor(result_Y* 100)/100 == 0 )
    {
      if(temp == Math.floor(i*100)/100){
        continue;
      }
      zeroXArr.push(Math.floor(i*100)/100)
      temp=Math.floor(i*100)/100;    
    }
    
    if(Math.floor(i* 100)/100 ==0 )
    {
      if(tempY ==Math.floor(result_Y * 100)/100 )
        {
          continue
        }
      zeroY.push(Math.floor(result_Y * 100)/100);
      tempY = Math.floor(result_Y * 100)/100;
    }
  }
  return {zeroXArr,zeroY};
}

function show(vleraExtremeMax, vleraExtremeMin)
{
  let zerotObj=[];
  let zerotString
  let zerotYString
  zerotObj.push(Zerot()) 
  for (const v of zerotObj) {
    zerotString = v.zeroXArr + ", ";
  }
  for (const v of zerotObj) {
    zerotYString = v.zeroY + "; ";
  }
  showDiv.innerHTML="YMax:"+ vleraExtremeMax + ", Ymin: " + vleraExtremeMin + "<br> Funksioni eshte: "+ CiftTek()+ "<br> Zerot e funksionit jane: " + zerotString + "\n kurse prerjet me boshtin y jane ne : "+ zerotYString; 
}
// interesting Graphs
// sin(pow(x,x))/pow(2,(pow(x,x)-pi/2)/2)  tan(cos(1/pow(x,2))x)

