class CalcElement extends HTMLElement{
    constructor(label,size){
        super();
        this.size = size;
        super.innerText = label;
        super.classList.add(`col-md-${size}`);
        this.addEventListener(onclick,action());
    }
    action(){};
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
class NumButton extends CalcElement{
    constructor(number){
        super();
        super.innerText = number;
    }
    action(){
        
    }

}
class OperatorButton extends CalcElement{

}


function Init(){
    customElements.define('calc-element',CalcElement);
    doc = document.querySelector(".container");
    console.log(doc);
    let input = new CalcElement("input",,12);
    input.changeSize(4);
    doc.appendChild(input);
}
