let sumFunction = (a,b) => { return a + b; };
let substractFunction = (a,b) => { return a - b; };
let multipleFunction = (a,b) => { return a * b; };
let divideFunction = (a,b) => { return a / b; };

let operationEnum = {PLUS: 1, MINUS: 2, MULTIPLY: 3, DIVIDE: 4};
let operationSymbolEnum = {PLUS: '+', MINUS: '-', MULTIPLY: '\u00d7', DIVIDE: '\u00f7'};

class CalcElement extends HTMLElement{
    constructor(label,size){
        super();
        this.size = size;
        super.innerText = label;
        super.classList.add(`col-md-${size}`);
    }
    get label(){
        return super.innerText;
    }
    set label(label){
        super.innerText = label;
    }
    changeSize(newSize){
        super.classList.remove(`col-md-${this.size}`);
        super.classList.add(`col-md-${newSize}`);
    }
} 
class Calc{
    constructor(OutputField){
        this.OutputField = OutputField;
        this.numbers = [];
        this.operation;
    }
    inputNum(number){
        if (this.numbers.length >= 2){
            this.numbers.pop();
            this.numbers.unshift(number);
        }
        else{
            this.numbers.unshift(number);
        }
    }
    inputOp(operationEnum){
        this.operationEnum = operationEnum;
    }
    calculate(){
        let result = 0;
        if (this.operationEnum == operationEnum.DIVIDE && this.numbers[0] == 0){
            alert("You shall not divide by zero!!!");
        }
        else{
            switch (this.operationEnum){
                case operationEnum.PLUS:
                    result = sumFunction(this.numbers[1], this.numbers[0]);
                    break;
                case operationEnum.MINUS:
                    result = substractFunction(this.numbers[1], this.numbers[0]);
                    break;
                case operationEnum.MULTIPLY:
                    result = multipleFunction(this.numbers[1], this.numbers[0]);
                    break;
                case operationEnum.DIVIDE:
                    result = divideFunction(this.numbers[1], this.numbers[0]);
                    break;
            }
            this.OutputField.setOutput(result);
        }
    }
}
class NumButton extends CalcElement{
    constructor(number, Calc){
        super();
        super.innerText = number;
        this.Calc = Calc;
        this.addEventListener("click",onClick());
    }
    onClick(){
        Calc.inputNum(Number(number));
    }
}

class OperatorButton extends CalcElement{
    constructor(operationSymbolEnum, Calc){
        super();
        super.innerText = operationSymbolEnum;
        this.Calc = Calc;
        this.addEventListener("click",onClick());
    }
    onClick(){
        Calc.inputOp(operationSymbolEnum);
    }
}

class OutputField extends CalcElement{
    constructor(){
        super();
    }
    setOutput(number){
        this.innerText = String(number);
    }
}

function Init(){
    customElements.define('calc-element',CalcElement);
    customElements.define('num-button',NumButton);
    customElements.define('operator-button', OperatorButton);
    customElements.define('output-field',OutputField);
    let Output = new OutputField();
    let Kalkulator = new Calc(Output);
    Kalkulator.inputNum(10);
    Kalkulator.inputNum(5);
    Kalkulator.inputOp(operationEnum.DIVIDE);
    Kalkulator.calculate();
    console.log(Output.innerText);
}
