const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
let garden = new FileReader()
    .read(filePath)
    .split('\n')
    .map((line) => line.trim().split(''))
let visited = new Set()
const directions = [
    { rowDir: -1, colDir: 0 }, // up
    { rowDir: 1, colDir: 0 }, // down
    { rowDir: 0, colDir: -1 }, // left
    { rowDir: 0, colDir: 1 }, // right
]

function posKey(row, col) {
    return `${row}:${col}`
}

function isValidPos(row, col) {
    return 0 <= row && row < garden.length && 0 <= col && col < garden[0].length
}

function calcPerimeter(row, col) {
    let perimeter = 0
    const plant = garden[row]?.[col]
    for (const { rowDir, colDir } of directions) {
        const newRow = row + rowDir
        const newCol = col + colDir

        if (garden[newRow] === undefined || garden[newRow]?.[newCol] !== plant)
            perimeter++
    }
    return perimeter
}

function calcRegionPrice(row, col) {
    let area = 0
    let perimeter = 0
    const queue = []

    visited.add(posKey(row, col))
    queue.push({ row, col })

    while (queue.length) {
        const current = queue.shift()
        area++
        perimeter += calcPerimeter(current.row, current.col)

        for (const { rowDir, colDir } of directions) {
            const newRow = current.row + rowDir
            const newCol = current.col + colDir
            const newPosKey = posKey(newRow, newCol)

            if (
                isValidPos(newRow, newCol) &&
                garden[row][col] === garden[newRow][newCol] &&
                !visited.has(newPosKey)
            ) {
                visited.add(newPosKey)
                queue.push({ row: newRow, col: newCol })
            }
        }
    }

    return area * perimeter
}

let totalRegionPrice = 0
for (let row = 0; row < garden.length; row++) {
    for (let col = 0; col < garden[0].length; col++) {
        if (visited.has(posKey(row, col))) continue
        totalRegionPrice += calcRegionPrice(row, col)
    }
}

console.log(totalRegionPrice)
