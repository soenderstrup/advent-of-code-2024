const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim())
const equations = lines.map((line) => {
    const numbers = line
        .replace(':', '')
        .split(' ')
        .map((number) => Number(number))
    return { testValue: numbers[0], numbers: numbers.slice(1) }
})
const permutationsTable = []

let totalCalibrationResult = 0
for (let equation of equations) {
    if (isValid(equation)) {
        totalCalibrationResult += equation.testValue
    }
}

console.log(totalCalibrationResult)

function isValid({ testValue, numbers }) {
    let permutations = permutationsTable[numbers.length - 1]
    if (permutations === undefined) {
        permutations = generatePermutations(numbers.length - 1)
        permutationsTable[numbers.length - 1] = permutations
    }
    for (let permutation of permutations) {
        let result = numbers[0]
        for (let i = 1; i < numbers.length; i++) {
            const operator = permutation[i - 1]
            if (operator === '+') {
                result += numbers[i]
            } else if (operator === '*') {
                result *= numbers[i]
            } else if (operator === '||') {
                result = Number('' + result + numbers[i])
            } else {
                throw new Error('Invalid operator')
            }
        }
        if (result === testValue) return true
    }
    return false
}

function generatePermutations(n, current = []) {
    if (n === 0) {
        return [current]
    } else {
        return generatePermutations(n - 1, current.concat(['+']))
            .concat(generatePermutations(n - 1, current.concat(['*'])))
            .concat(generatePermutations(n - 1, current.concat(['||'])))
    }
}
