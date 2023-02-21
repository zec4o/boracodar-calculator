const divide = document.querySelector('#divide')
const multiply = document.querySelector('#multiply')
const plus = document.querySelector('#plus')
const minus = document.querySelector('#minus')
const equal = document.querySelector('#equal')
const numbers = document.querySelectorAll('.number')

const calc = document.querySelector('#calculo')
const operator = document.querySelector('#operator')
const result = document.querySelector('#numberResult')
const comma = document.querySelector('#comma')
const numberResult = document.querySelector('#plusMinus')
const cancelEntry = document.querySelector('#cancelEntry')
const cancel = document.querySelector('#cancel')

let currentOperation = ""
let firstNumber = "0"
let secondNumber = "0"
let resultNumber = ""
let isInSecondNumber = false
let firstNumberIsNegative = false
let secondNumberIsNegative = false

function addNumber(newValue) {
  if (!isInSecondNumber) {
    if (firstNumber === '0') {
      firstNumber = newValue
    } else if (firstNumber === '-0') {
      firstNumber = `-${newValue}`
    } else {
      firstNumber += newValue
    }
    result.innerText = firstNumber
  } else {
    if (secondNumber === '0') {
      secondNumber = newValue
    } else if (secondNumber === '-0') {
      firstNumber = `-${newValue}`
    } else {
      secondNumber += newValue
    }
    result.innerText = secondNumber
  }
  changeCalc()
}

function removeNumber() {
  if (!resultNumber) {
    if (!isInSecondNumber) {
      firstNumber = firstNumberIsNegative ? firstNumber.length === 2 ? '-0' : firstNumber.slice(0, -1) : firstNumber.length === 1 ? '0' : firstNumber.slice(0, -1)
      result.innerText = firstNumber
    } else {
      secondNumber = secondNumberIsNegative ? secondNumber.length === 2 ? '-0' : secondNumber.slice(0, -1) : secondNumber.length === 1 ? '0' : secondNumber.slice(0, -1)
      result.innerText = secondNumber
    }
    changeCalc()
  } else {
    clear()
  }
}

function clear() {
  firstNumber = "0"
  secondNumber = "0"
  resultNumber = ""
  result.innerText = "0"
  operator.innerText = ""
  calc.innerText = ""
  currentOperation = ""
  isInSecondNumber = false
}

function changeOperation(newOperation) {
  operator.innerText = newOperation
  console.log(firstNumber, secondNumber, resultNumber)

  if (!isInSecondNumber) {
    isInSecondNumber = true
    result.innerText = secondNumber
  } else {
    if (newOperation !== '=') {
      if (!!resultNumber) {
        firstNumber = firstNumberIsNegative ? `-${resultNumber}` : resultNumber
        secondNumber = "0"
        resultNumber = ""
      }
    }
  }

  if (newOperation === '=') {
    if (currentOperation === '+') {
      result.innerText = parseFloat(firstNumber) + parseFloat(secondNumber)
    } else if (currentOperation === '-') {
      result.innerText = parseFloat(firstNumber) - parseFloat(secondNumber)
    } else if (currentOperation === '*') {
      result.innerText = parseFloat(firstNumber) * parseFloat(secondNumber)
    } else if (currentOperation === '/') {
      result.innerText = parseFloat(firstNumber) / parseFloat(secondNumber)
    } else {
      currentOperation = '+'
      result.innerText = parseFloat(firstNumber) + parseFloat(secondNumber)
    }
    resultNumber = result.innerText
  } else {
    currentOperation = newOperation
  }

  changeCalc()
}

function changeCalc() {
  if (!isInSecondNumber) {
    calc.innerText = `${firstNumber}`
  } else {
    calc.innerText = `${firstNumber} ${currentOperation} ${secondNumber}`
  }
}

divide.addEventListener('click', () => changeOperation('/'))
multiply.addEventListener('click', () => changeOperation('*'))
minus.addEventListener('click', () => changeOperation('-'))
plus.addEventListener('click', () => changeOperation('+'))
equal.addEventListener('click', () => changeOperation('='))

numbers.forEach(number => {
  number.addEventListener('click', (e) => addNumber(e.target.innerText))
})

comma.addEventListener('click', () => {
  if (!isInSecondNumber) {
    if (!firstNumber.includes('.')) {
      firstNumber += '.'
      result.innerText = firstNumber
    }
  } else {
    if (!secondNumber.includes('.')) {
      secondNumber += '.'
      result.innerText = secondNumber
    }
  }
  changeCalc()
})

plusMinus.addEventListener('click', () => {
  if (!isInSecondNumber) {
    if (firstNumber[0] === '-') {
      firstNumber = firstNumber.slice(1, firstNumber.length)
      firstNumberIsNegative = false
    } else {
      firstNumber = `-${firstNumber}`
      firstNumberIsNegative = true
    }
    result.innerText = firstNumber
  } else {
    if (secondNumber[0] === '-') {
      secondNumber = secondNumber.slice(1, secondNumber.length)
      secondNumberIsNegative = false

      result.innerText = secondNumber
    } else {
      secondNumber = `-${secondNumber}`
      secondNumberIsNegative = true

      result.innerText = secondNumber
    }
  }

  if (!!resultNumber) {
    if (firstNumber[0] === '-') {
      firstNumber = resultNumber
      secondNumber = "0"
      firstNumberIsNegative = false
      result.innerText = firstNumber
    } else {
      firstNumber = `-${resultNumber}`
      secondNumber = '0'
      firstNumberIsNegative = true
      result.innerText = firstNumber
    }
  }
  changeCalc()
})

cancelEntry.addEventListener('click', removeNumber)
cancel.addEventListener('click', clear)