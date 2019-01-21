let sumFunction = (a,b) => { return a + b; };
let substractFunction = (a,b) => { return a - b; };
let multipleFunction = (a,b) => { return a * b; };
let divideFunction = (a,b) => { return a / b; };
let operationSymbolEnum = {PLUS: '+', MINUS: '-', MULTIPLY: '\u00d7', DIVIDE: '\u00f7',CALC: '=',COMA : ',',P_M: '\u00b1' , C: 'C', BACKSPACE: '\u232B'}; //P_m +/- unicode symbol

class CalcElement extends HTMLButtonElement{
    constructor(){
        super();
        super.classList.add(`btn`);
    }
} 
class AbstractInjectedFuncionality{
    constructor(func, Calc){
        this.function = func;
        this.calc = Calc;
    }
    invoke(){}
}
class TwoArgumentsOperation extends AbstractInjectedFuncionality{
    constructor(operationSymbolEnum, functionIndicator, Calc){
        super();
        super.function = functionIndicator;
        this.operationSymbolEnum = operationSymbolEnum;
        super.calc = Calc;
    }
    invoke(){
        if (super.calc.isNumberSaved){
            super.calc.doSavedOperation();
        }
        else{
            super.calc.saveNumberAndClearOutput();
        }
        super.calc.setOperation(super.function);
    }
}
class Functionality extends AbstractInjectedFuncionality{
    constructor(operationSymbolEnum,Calc, OutputField){
        super();
        super.function = operationSymbolEnum;
        super.calc = Calc;
        this.output = OutputField;
    }
    invoke(){
        switch(super.function){
            case operationSymbolEnum.COMA:
                this.output.addComa();
                break;
            case operationSymbolEnum.CALC:
                if (super.calc.isNumberSaved){
                    super.calc.doSavedOperation();
                }
                break;
            case operationSymbolEnum.P_M:
                this.output.changeSign();
                break;
            case operationSymbolEnum.BACKSPACE:
                this.output.backspace();
                break;
            case 'C':
                this.output.clearOutput();
                break;
        }
    }
    getEnum(){
        return super.function;
    }
}
class Calc{
    constructor(OutputField){
        this.OutputField = OutputField;
        this.numberA;
        this.numberB;
        this.operation;
        this.numberSaved = false;
    }
    loadActualNumber(){
        this.numberA = this.OutputField.getOutput();
    }
    saveNumberAndClearOutput(){
        this.numberB = this.numberA;
        this.numberSaved = true;
        this.OutputField.clearOutput();
    }
    setOperation(operation){
        this.operation = operation;
    }
    doSavedOperation(){
        this.clearOutput();
        this.numberA = this.operation(this.numberB, this.numberA);
        this.numberSaved = false;
        this.setOutput(this.numberA);
    }
    isNumberSaved(){
        return this.numberSaved;
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
    constructor(Functionality){
        super();
        this.function = Functionality;
        super.innerText = Functionality.getEnum();
        super.classList.add(`btn`);
        super.classList.add(`btn-secondary`);
        super.addEventListener("click",() => {
            this.function.invoke();
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
    getOutput(){
        return super.value;
    }
    clearOutput(){
        super.value = null;
    }
    addComa(){
        super.value += ',';
    }
    changeSign(){
        super.value *= -1;
    }
    backspace(){
        super.value = String(super.value).substring(0, String(super.value).length - 1);
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
function addFirstOperatorRow(Calc,OutputField){
    operators = document.querySelectorAll(`.col-sm-4`);
    let CFunctionality = new Functionality(operationSymbolEnum.C,Calc,OutputField);
    let BackspaceFunctionality = new Functionality(operationSymbolEnum.BACKSPACE,Calc, OutputField);
    console.log(CFunctionality);
    operators[0].appendChild(new OperatorButton(CFunctionality));
    operators[1].appendChild(new OperatorButton(BackspaceFunctionality));
    // operators[2].appendChild(new OperatorButton(new Functionality(operationSymbolEnum.PLUS,Calc,OutputField)));
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
    addFirstOperatorRow(Calc,OutputField);
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
