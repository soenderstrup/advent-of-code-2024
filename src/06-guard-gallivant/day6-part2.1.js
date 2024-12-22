const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim())
const map = lines.map((line) => line.split(''))

let { row, col } = findGuardStartPosition(map)
let distinctPositions = 0
const rowGuardStart = row
const colGuardStart = col
const directions = [
    { rowDir: -1, colDir: 0 },
    { rowDir: 0, colDir: 1 },
    { rowDir: 1, colDir: 0 },
    { rowDir: 0, colDir: -1 },
]
let dir = 0
let isGuardOnMap = true
let guardTrack = []
while (isGuardOnMap) {
    const { rowDir, colDir } = directions[dir]
    const nextStep = map[row + rowDir]?.[col + colDir]
    if (nextStep === undefined) isGuardOnMap = false

    if (nextStep === '#') {
        dir = (dir + 1) % 4
    } else {
        if (map[row][col] !== 'X') {
            map[row][col] = 'X'
            guardTrack.push({ row, col, dir })
        }
        row += rowDir
        col += colDir
    }
}

console.log(guardTrack)

guardTrack.forEach(({ row, col, dir }) => {
    if (isLoop(row, col, dir)) {
        distinctPositions++
    }
})

console.log(distinctPositions)

function isLoop(row, col, dir) {
    const loopKeys = new Set(positionKey(row, col, dir))
    const { rowDir, colDir } = directions[dir]
    const obstructionRow = row + rowDir
    const obstructionCol = col + colDir
    const obstructionPos = map[obstructionRow]?.[obstructionCol]
    const obstructionPosInvalid =
        obstructionPos !== 'X' ||
        (obstructionRow === rowGuardStart && obstructionCol === colGuardStart)
    if (obstructionPosInvalid) {
        return false
    }
    map[obstructionRow][obstructionCol] = '#'
    while (true) {
        const { rowDir, colDir } = directions[dir]
        const nextStep = map[row + rowDir]?.[col + colDir]
        if (nextStep === undefined) {
            map[obstructionRow][obstructionCol] = 'X'
            console.log('OUT OF MAP')
            return false
        }

        if (nextStep === '#') {
            console.log('TURNING')
            dir = (dir + 1) % 4
        } else {
            console.log(positionKey(row, col, dir))
            if (loopKeys.has(positionKey(row, col, dir))) {
                console.log('LOOP FOUND: ', positionKey(row, col, dir))
                map[obstructionRow][obstructionCol] = 'X'
                return true
            } else {
                loopKeys.add(positionKey(row, col, dir))
                row += rowDir
                col += colDir
            }
        }
    }
}

function findGuardStartPosition(map) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === '^') {
                return { row, col }
            }
        }
    }
}

function positionKey(row, col, dir) {
    return `${row},${col},${dir}`
}
