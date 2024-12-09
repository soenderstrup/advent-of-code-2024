const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const fileReader = new FileReader()
const parsedData = fileReader.parseTwoColumns(filePath)

let leftList = []
let rightList = []

for (let line of parsedData) {
    leftList.push(line.first)
    rightList.push(line.second)
}

const map = new Map() // dataset is too small to provide performance improvements using the map

console.time()
let similarityScore = 0
for (let leftItem of leftList) {
    // if (map.has(leftItem)) {
    //     similarityScore += map.get(leftItem);
    //     continue;
    // }

    let count = 0
    for (let rightItem of rightList) {
        if (leftItem === rightItem) count++
    }
    similarityScore += leftItem * count
    // map.set(leftItem, similarityScore)
}
console.timeEnd()

console.log(similarityScore)
