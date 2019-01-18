let sumFunction = (a,b) => { return a + b; };
let substractFunction = (a,b) => { return a - b; };
let multipleFunction = (a,b) => { return a * b; };
let divideFunction = (a,b) => { return a / b; };
let operationSymbolEnum = {PLUS: '+', MINUS: '-', MULTIPLY: '\u00d7', DIVIDE: '\u00f7',CALC: '=',COMA : ',',P_M: '\u00b1' , C: 'c', BACKSPACE: '\u232B'}; //P_m +/- unicode symbol

class CalcElement extends HTMLButtonElement{
    constructor(label){
        super();
        super.classList.add(`btn`);
        this.innerText = label;
    }
} 
class Calc{
    constructor(OutputField){
        this.OutputField = OutputField;
        this.numbers = [];
        this.operation;
    }
    inputNum(number){ //do poprawy->wczytywanie liczb większych niż 9
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
    constructor(number, OutputField){
        super();
        super.innerText = number;
        this.OutputField = OutputField;
        super.classList.add(`btn-primary`);
        super.addEventListener("click",() => {
            this.OutputField.setOutput(super.innerText);
        });
    }
}

class OperatorButton extends CalcElement{
    constructor(operationSymbolEnum, Calc,operation){
        super();
        super.innerText = operationSymbolEnum;
        this.Calc = Calc;
        super.classList.add(`btn`);
        super.classList.add(`btn-secondary`);
        this.operation = operation;
        super.addEventListener("click",() => {
            this.Calc.inputOp(this.operation);
        });
    }
}

class OutputField extends HTMLInputElement{
    constructor(){
        super();
        super.classList.add(`form-control`);
    }
    setOutput(number){
        super.value += String(number);
    }
}
function createRows(howMany){
    let rows = document.createDocumentFragment();
    for (let i = 0; i < howMany; i++){
        let element = document.createElement(`div`);
        element.className = `row`;
        rows.appendChild(element);
    }
    return rows;
}
function createColumns(howMany){
    let size = 12/Number(howMany);
    let columns = document.createDocumentFragment();
    for (let i = 0; i < howMany; i++){
        let element = document.createElement(`div`);
        element.className = `col-sm-${size}`;
        columns.appendChild(element);
    }
    return columns;
}
function createGrid(){
    let doc = document.querySelector(`.container`);
    doc.appendChild( createRows(6) );
    let rows = document.querySelectorAll(`.row`);
    columnsFirstRow = createColumns(1);
    rows[0].appendChild(columnsFirstRow);
    columnsSecondRow = createColumns(3);
    rows[1].appendChild(columnsSecondRow);
    for (let i = 2; i < rows.length; i++){
        columnsRowI = createColumns(4);
        rows[i].appendChild(columnsRowI);
    }
}
function addFirstOperatorRow(Calc){
    operators = document.querySelectorAll(`.col-sm-4`);
    operators[0].appendChild(new OperatorButton(operationSymbolEnum.C,Calc));
    operators[1].appendChild(new OperatorButton(operationSymbolEnum.BACKSPACE, Calc));
    operators[2].appendChild(new OperatorButton(operationSymbolEnum.PLUS,Calc,sumFunction));
}
function addButtonsToGrid(Calc,OutputField){
    nums = document.querySelectorAll(`.col-sm-3`);
    numbers = [7,8,9,4,5,6,1,2,3,0];
    let j=0; //additional counter for going through numbers[]
    for (let i = 0; i < nums.length; i++){
        switch (i){
            case 3:
                nums[i].appendChild(new OperatorButton(operationSymbolEnum.MINUS,Calc,substractFunction));
                break;
            case 7:
                nums[i].appendChild(new OperatorButton(operationSymbolEnum.DIVIDE,Calc,divideFunction));
                break;
            case 11:
                nums[i].appendChild(new OperatorButton(operationSymbolEnum.MULTIPLY, Calc,multipleFunction));
                break;
            case 15:
                nums[i].appendChild(new OperatorButton(operationSymbolEnum.CALC, Calc));
                break;
            case 12:
                nums[i].appendChild(new OperatorButton(operationSymbolEnum.P_M, Calc));
                break;
            case 14:
                nums[i].appendChild(new OperatorButton(operationSymbolEnum.COMA, Calc));
                break;
            default:
                nums[i].appendChild(new NumButton(numbers[j],OutputField));
                j++;
                break;
        }
    }

}
function fillGrid(Calc,OutputField){
    doc = document.querySelector(`.col-sm-12`);
    doc.appendChild(OutputField);
    addFirstOperatorRow(Calc);
    addButtonsToGrid(Calc,OutputField);
}
function Init(){
    customElements.define('calc-element',CalcElement,{extends:'button'});
    customElements.define('num-button',NumButton,{extends:'button'});
    customElements.define('operator-button', OperatorButton,{extends:'button'});
    customElements.define('output-field',OutputField, {extends:'input'});
    let output = new OutputField();
    let calc = new Calc(output);
    createGrid();
    fillGrid(calc,output);
}
