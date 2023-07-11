let container = document.querySelector(".operations")
let display = document.querySelector(".display span")
let calc = document.querySelector("#calc")
let reset = document.querySelector("#reset")
let del = document.querySelector("#del")
let inputs = document.querySelectorAll('.operations .input')

let numsArr = [];
let operationArr = ['/','x','-','+'];
let before ;
let after ;
let inputOperation ; 
let result ;


inputs.forEach(ele => {
    ele.addEventListener('click',function(e) {
        let ops = e.target.getAttribute('value');
        if (operationArr.includes(ops)){
            inputOperation = ops;
            display.textContent = ops;
            before = numsArr.join('');
            numsArr = [];
        } else {
            if (before === undefined){
                numsArr.push(ops);
                display.textContent = numsArr.join("");
            } else if (before !== undefined){
                numsArr.push(ops);
                after = numsArr.join("");
                display.textContent = after;
            }
        }
    })
})


del.onclick = () => {
    let content = display.textContent;
    let contentArr = content.split('');
    if (contentArr.length > 1){
        contentArr.pop()
        display.textContent = contentArr.join('')
    } else {
        display.textContent = '0'
    }
    
}

reset.onclick = () => {
    numsArr = [];
    before = '';
    after = '';
    inputOperation = '';
    result = '';
    display.textContent = '0'
}


calc.onclick = function() {
    switch (inputOperation) {
        case '+':
            result = +before + +after;
            break;
        case '-':
            result = +before - +after;
            break;
        
        case 'x':
            result = +before * +after;
            break;
        
        case '/':
            result = +before / +after;
            break;

        default:
            break;
    }
    display.textContent = result;
    numsArr = []
}

