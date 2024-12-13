const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim())
const map = lines.map((line) => line.split(''))

let { row, col } = findGuardStartPosition(map)
let distinctPositions = 0
const directions = [
    { rowDir: -1, colDir: 0 },
    { rowDir: 0, colDir: 1 },
    { rowDir: 1, colDir: 0 },
    { rowDir: 0, colDir: -1 },
]
let direction = 0
let isGuardOnMap = true
while (isGuardOnMap) {
    const { rowDir, colDir } = directions[direction]
    const nextStep = map[row + rowDir]?.[col + colDir]
    if (nextStep === undefined) isGuardOnMap = false

    if (nextStep === '#') {
        direction = (direction + 1) % 4
    } else {
        if (map[row][col] !== 'X') {
            map[row][col] = 'X'
            distinctPositions++
        }
        row += rowDir
        col += colDir
    }
}

map.forEach((row) => console.log(row.join('')))
console.log(distinctPositions)

function findGuardStartPosition(map) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === '^') {
                return { row, col }
            }
        }
    }
}
