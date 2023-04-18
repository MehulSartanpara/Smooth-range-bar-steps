var fir =  document.querySelector(".fir");
var range =  document.querySelector('.fir-range');
var min =  Math.floor(document.querySelector('.fir-range').getAttribute('min'));
var max =  Math.floor(document.querySelector('.fir-range').getAttribute('max'));

var rangeWidth = document.querySelector('.fir-range').value = 450;
var data = document.querySelector(".new-change").value = 450 ;
init(data);
function init(val) {
  initRange(val);
  initAnimate(val);
  changeButton(val)
}
function initRange(val) {
  textSuperPosition = document.querySelector('.fir-range').value ;
  changeVals();  
  document.querySelector('.fir-range').addEventListener('input', changeVals.bind(this));
}
function initAnimate() {  
  setInterval(() => requestAnimationFrame(changeCounter.bind(this)), 1000/60);
}
function changeVals() {
  amount = Math.floor(document.querySelector('.fir-range').value);
  range = (amount - min) / (max - min); 
}
function changeButton(val) {
  amount = Math.floor(val);
  range = (amount - min) / (max - min); 
}
function changeCounter(){
  textSuperPosition = lerp(textSuperPosition, amount, 1);  
  var newPosition = lerp(document.querySelector(".fir-counter").style.getPropertyValue('--position'), rangeWidth * range, 0.1);
  var logicCounter = amount - textSuperPosition  
  document.querySelector(".fir-counter").textContent = Math.floor(logicCounter > 0 && logicCounter < 1 ? amount : textSuperPosition);
  if(textSuperPosition < 100){
    var newSize = lerp(document.querySelector(".fir-line").style.getPropertyValue('--size') , range, 0.1);  
  }
  else if(textSuperPosition >= 100 && textSuperPosition < 250){
    var newSize = lerp(document.querySelector(".fir-line").style.getPropertyValue('--size') , range/2.5, 0.1);  
  }else if(textSuperPosition >= 250){
    var newSize = lerp(document.querySelector(".fir-line").style.getPropertyValue('--size') , range/5, 0.1);  
  }    
  document.querySelector(".fir-line").style.setProperty('--size',newSize);
  document.querySelector(".dot").style.left  = (newSize*100)+'%'
  document.querySelector(".range_bar .range_bar_tooltip").style.left = (newSize*100)+'%'
}
function lerp(start, end, amt) {  
  return (1-amt) * start + amt * end;  
}

function changeOneStep(change){
  let countNum = document.querySelector(".fir-range");
  if(change < 100){
    countNum.setAttribute("max",'100')
    countNum.setAttribute("step",'1')
  }
  else if(change >= 100 && change < 250){
    countNum.setAttribute("max",'250')
    countNum.setAttribute("step",'1')
  }else if(change >= 250){  
    countNum.setAttribute("max",'500')
    countNum.setAttribute("step",'1')
  }
}
function closeOneStep(change){
  let countNum = document.querySelector(".fir-range");
  if(change < 100){
    countNum.setAttribute("max",'100')
    countNum.setAttribute("step",'1')
  }
  else if(change >= 100 && change < 250){
    countNum.setAttribute("max",'250')
    countNum.setAttribute("step",'25')
  }else if(change >= 250){  
    countNum.setAttribute("max",'500')
    countNum.setAttribute("step",'50')
  }
}


var change = document.querySelector('.new-change');
change.addEventListener("keyup" , function(a){  
  changeCounter();
  changeButton(this.value)  
  closeOneStep(this.value)
})
change.addEventListener("keydown" , function(a){  
  changeOneStep(this.value); 
})

var newRange  = document.querySelector('.fir-range');
newRange.addEventListener("change" , function(a){
  changeCounter()
  let value = document.querySelector("span.fir-counter").innerHTML;
  let dosc = document.querySelector(".fir-range").value = Number(value);
    if(dosc < 100){
      this.setAttribute("max",'100')
      this.setAttribute("step",'1')
    }
    else if(dosc >= 100 && this.value < 250){
      this.setAttribute("max",'250')
      this.setAttribute("step",'25')
    }else if(dosc >= 250){
      this.setAttribute("max",'500')
      this.setAttribute("step",'50')
    }else{
      // console.log("his.value" , this.value)
    }
    document.querySelector(".new-change").value = this.value;    
})
