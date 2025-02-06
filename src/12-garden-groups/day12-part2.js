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
    { rowDir: 0, colDir: 1 }, // right
    { rowDir: 1, colDir: 0 }, // down
    { rowDir: 0, colDir: -1 }, // left
]

function posKey(row, col) {
    return `${row}:${col}`
}

function isValidPos(row, col) {
    return 0 <= row && row < garden.length && 0 <= col && col < garden[0].length
}

function countCorners(row, col) {
    let corners = 0
    const plant = garden[row][col]
    for (let i = 0; i < directions.length; i++) {
        const { rowDir: rowDir1, colDir: colDir1 } = directions[i]
        const { rowDir: rowDir2, colDir: colDir2 } =
            directions[(i + 1) % directions.length]
        const plant1 = garden[row + rowDir1]?.[col + colDir1]
        const plant2 = garden[row + rowDir2]?.[col + colDir2]
        const diagonal =
            garden[row + rowDir1 + rowDir2]?.[col + colDir1 + colDir2]

        if (
            (plant1 === plant && plant2 === plant && diagonal !== plant) ||
            (plant1 !== plant && plant2 !== plant)
        ) {
            corners++
        }
    }
    return corners
}

function calcRegionPrice(row, col) {
    let area = 0
    let sides = 0
    const queue = []

    visited.add(posKey(row, col))
    queue.push({ row, col })

    while (queue.length) {
        const current = queue.shift()
        area++
        sides += countCorners(current.row, current.col)

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

    return area * sides
}

let totalRegionPrice = 0
for (let row = 0; row < garden.length; row++) {
    for (let col = 0; col < garden[0].length; col++) {
        if (visited.has(posKey(row, col))) continue
        totalRegionPrice += calcRegionPrice(row, col)
    }
}

console.log(totalRegionPrice)
