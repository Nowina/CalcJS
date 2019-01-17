class CalcElement extends HTMLElement{
    constructor(){
        super();
    }
    set label(label){
        super.innerText = label;
    }
    set size(size){
        super.classList.add('.col-md-${size}');
    }
} 



function Init(){
    doc = document.querySelector(".container");
    console.log(doc);
    let input = new CalcElement(12,"input");
    doc.appendChild(input);
}
