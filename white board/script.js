const canvas=document.getElementById('canvas');
canvas.width=window.innerWidth - 50;
canvas.height= 400;
let context=canvas.getContext("2d");
let startc="white";
context.fillStyle=startc;
context.fillRect(0,0,canvas.width,canvas.height);


let draw_color="black";
let draw_width="1";
let is_drawing=false;


let arr=[];
let index=-1;

canvas.addEventListener("touchstart" , start,false);
canvas.addEventListener("touchmove" , draw,false);
canvas.addEventListener("mousedown" , start,false);
canvas.addEventListener("mousemove" , draw,false);


canvas.addEventListener("touchend" , stop,false);
canvas.addEventListener("mouseup" , stop,false);
canvas.addEventListener("mouseout" , stop,false);
function start(event){
    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,event.clientY- canvas.offsetTop);
   event.preventDefault();
}
function draw(event){
    if(is_drawing){
        context.lineTo(event.clientX - canvas.offsetLeft,event.clientY- canvas.offsetTop);
        context.strokeStyle=draw_color;
        context.lineWidth=draw_width;
        context.lineCap="round";
        context.lineJoin="round";
        context.stroke();
   
   
    }
}
function stop(event){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    event.preventDefault();
    if(event.type!='mouseout'){
        arr.push(context.getImageData(0,0,canvas.width,canvas.height));
        index+=1;
        // console.log(arr)
    }
    
}
function change_color(element){
    draw_color=element.style.background;
}
function clear_canvas(){
    context.fillStyle=startc;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);
    arr=[];
    index=-1;

}
function undo(){
    if(index<=0){
        clear_canvas();
    }
    else{
        index-=1;
        arr.pop();
        context.putImageData(arr[index],0,0);
    }
}
