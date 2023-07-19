class Calculator {
    constructor(currentOperandTextElement, previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement
        this.previousOperandTextElement = previousOperandTextElement
        this.clear()
    }   

    clear (){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete (){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber (number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation (operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate (){
        let result
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation){
            case '+':
                result = prev + current
                break

            case '-':
                result = prev - current
                break

            case 'x':
                result = prev * current
                break

            case '÷':
                result = prev / current
            break
            default:
                break
        }

        this.currentOperand = result
        this.previousOperand = ''
        this.operation = undefined
    }

    getDisplayNumber (number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay (){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)

        if (this.operation !== undefined){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}

const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')
const operationButtons = document.querySelectorAll('[data-operation]')
const numberButtons = document.querySelectorAll('[data-number]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')


const calculator = new Calculator(currentOperand, previousOperand)

numberButtons.forEach(button => button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
}))

operationButtons.forEach(button => button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
}))

equalButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
