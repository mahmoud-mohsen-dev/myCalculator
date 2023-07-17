let container = document.querySelector(".operations")
let display = document.querySelector(".display span")
let calc = document.querySelector("#calc")
let reset = document.querySelector("#reset")
let del = document.querySelector("#del")
let inputs = document.querySelectorAll('.operations .input')

let numsArr = [];
let operationArr = ['/','x','-','+'];
let nums ;
let totalArr = [];
let result;

inputs.forEach(ele => {
    ele.addEventListener('click',function(e) {
        let ops = e.target.getAttribute('value');
        if (!operationArr.includes(ops)){
            numsArr.push(ops)
            nums = numsArr.join("")            
            display.textContent = nums
        }
        if (operationArr.includes(ops)) {
            numsArr = []
            display.textContent = ops
            totalArr.push(nums, ops)
        } 
    })
})



del.onclick = () => {
    let content = display.textContent;
    let contentArr = content.split('');
    if (contentArr.length > 1){
        contentArr.pop()
        nums = contentArr.join('')
        numsArr = []
        result = nums;
        display.textContent = nums
    } else {
        nums = '0'
        display.textContent = '0'
    }
}

reset.onclick = () => {
    numsArr = [];
    nums = '';
    totalArr = []
    display.textContent = '0';
}


calc.onclick = function() {


    numsArr = []
    totalArr.push(nums)
    console.log('totalArr: ' + totalArr)
    let before ;
    let after ;

    totalArr.forEach((e,i,arr) => {
        if (operationArr.includes(e)){
            // console.log(result)
            if (result === undefined || result === null){
                before = arr[i - 1];
                after = arr[i + 1];
                console.log('before: ' + before)
                console.log('after: ' + after)
                
            } else {
                before = result
                after = arr[i + 1];
                console.log('before else: ' + before)
                console.log('after else: ' + after)
            }

            switch (e) {
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
            console.log("result : " + result)
        }
    })
    display.textContent = result;
}

