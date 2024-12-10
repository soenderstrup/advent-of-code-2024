const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)

const matches = [...data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]

let sum = 0
matches.forEach((match) => (sum += Number(match[1]) * Number(match[2])))

console.log(sum)
