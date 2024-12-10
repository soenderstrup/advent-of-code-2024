const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)

const matches = [...data.matchAll(/(?:do\(\)|don't\(\)|mul\((\d+),(\d+)\))/g)]

let enabled = true
let sum = 0
matches.forEach((match) => {
    if (match[0] === 'do()') {
        enabled = true
    } else if (match[0] === "don't()") {
        enabled = false
    } else if (enabled) {
        sum += Number(match[1] * Number(match[2]))
    }
})

console.log(sum)
