let calc = {
	displayValue: "0",
	firstOperand: null,
	secondOperand: false,
	operators: null,
}

function inputNumber(num){
	const { displayValue, secondOperand } = calc;

	if(secondOperand === true){
		calc.displayValue = num;
		calc.secondOperand = false;
	} else {
         calc.displayValue = displayValue === "0" ? num : displayValue + num
	}
	console.log(calc)
}
/*
function inputDecimal(dec){
	if(calc.secondOperand === true){
		calc.displayValue = "0";
		calc.secondOperand = false;
		return;
	}
	if(!calc.display.includes(dec)){
		calc.displayValue += dec;
	}
}
*/
function inputDecimal(dec) {
	if(calc.secondOperand === true){
		calc.displayValue = "0";
		calc.secondOperand = false;
		return;
	}
	
	if(!calc.displayValue.includes(dec)){
		calc.displayValue += dec;
	}
}

function handleOperator(nextOperator){
	let { firstOperand, displayValue, operators, secondOperand} = calc
	let inputValue = parseFloat(displayValue);

	if(firstOperand ==  null && !isNaN(inputValue)){
		calc.firstOperand = inputValue;
	}else if(operators){
		let result = doMath(firstOperand, inputValue, operators);
		calc.displayValue = `${parseFloat(result.toFixed(7))}`;
		calc.firstOperand = result;
	}

	calc.secondOperand = true;
	calc.operators = nextOperator;
	console.log(calc);
}

function doMath(firstOperand, secondOperand, operators){
   if(operators === "+"){
		return firstOperand + secondOperand;
	}else if(operators === "-"){
		return firstOperand - secondOperand;
	}else if(operators === "*"){
		return firstOperand * secondOperand;
	}else if(operators === "/"){
		return firstOperand / secondOperand;
	}
	return secondOperand
}

function clearCalc(){
	calc.displayValue = "0";
	calc.firstOperand = null;
	calc.secondOperand = false;
	calc.operators = null;
	console.log(calc);
}

function delNumber(){
	let display = calc.displayValue;
	if(display.length === 1){
		display = '0';
	}else{
		display = display.substring(0, display.length - 1);
	}
	calc.displayValue = display;
}

function updateDisplay() {
	let display = document.querySelector('.calc-display');
    display.value = calc.displayValue;

}

updateDisplay();

let inputKeys = document.querySelector(".calc-keys");
inputKeys.addEventListener("click", (event) => {
	let { target } = event;
	let { value } = target;
	if(!target.matches("button")){
		return;
	}

	switch(value){
	  case "+":
	  case "-":
	  case "*":
	  case "/":
	  case "=":
	  	handleOperator(value);
	  break;
	  case ".": inputDecimal(value);
	  break;
	  case "all-clear":
	 	clearCalc();
      break;
      case "delete":
      	delNumber();
      default:
      	if(Number.isInteger(parseFloat(value))){
      		inputNumber(value);
      	}
	}
	updateDisplay();
})





