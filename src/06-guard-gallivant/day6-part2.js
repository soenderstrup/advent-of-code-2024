const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim())
const map = lines.map((line) => line.split(''))

let { row, col } = findGuardStartPosition(map)
const rowGuardStart = row
const colGuardStart = col
let possibleLoops = 0
const directions = [
    { rowDir: -1, colDir: 0 },
    { rowDir: 0, colDir: 1 },
    { rowDir: 1, colDir: 0 },
    { rowDir: 0, colDir: -1 },
]
let direction = 0
let isGuardOnMap = true
const usedObstructionPositions = new Set()

while (isGuardOnMap) {
    const { rowDir, colDir } = directions[direction]
    const nextRow = row + rowDir
    const nextCol = col + colDir
    const nextStep = map[nextRow]?.[nextCol]
    if (nextStep === undefined) {
        isGuardOnMap = false
        break
    }

    if (nextStep === '#') {
        direction = (direction + 1) % 4
    } else {
        map[row][col] = 'X'
        if (isLoop(row, col, direction)) {
            possibleLoops++
        }
        row = nextRow
        col = nextCol
    }
}

map.forEach((line) => console.log(line.join('')))
console.log(possibleLoops)

function findGuardStartPosition(map) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === '^') {
                return { row, col }
            }
        }
    }
}

function isLoop(row, col, dir) {
    const { rowDir, colDir } = directions[dir]
    const obstructionRow = row + rowDir
    const obstructionCol = col + colDir
    const obstructionPos = map[obstructionRow]?.[obstructionCol]
    const obstructionPosInvalid =
        obstructionPos !== '.' ||
        (obstructionRow === rowGuardStart && obstructionCol === colGuardStart)
    if (obstructionPosInvalid) {
        return false
    }
    const obstructionKey = `${obstructionRow},${obstructionCol}`
    if (usedObstructionPositions.has(obstructionKey)) {
        return false
    }
    let isLoop = false
    const loopPrevSteps = [{ row, col, dir }]
    let isPossibleLoop = true
    dir = (dir + 1) % 4
    while (isPossibleLoop && !isLoop) {
        const { rowDir, colDir } = directions[dir]
        const nextRow = row + rowDir
        const nextCol = col + colDir
        const nextStep = map[nextRow]?.[nextCol]
        if (nextStep === undefined) {
            isPossibleLoop = false
        }

        if (nextStep === '#') {
            dir = (dir + 1) % 4
        } else {
            if (
                loopPrevSteps.some(
                    (step) =>
                        step.row === row && step.col === col && step.dir === dir
                )
            ) {
                isLoop = true
                usedObstructionPositions.add(obstructionKey)
            } else {
                loopPrevSteps.push({ row, col, dir })
                row = nextRow
                col = nextCol
            }
        }
    }
    return isLoop
}
