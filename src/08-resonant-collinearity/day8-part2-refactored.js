const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const map = data
    .split('\n')
    .map((line) => line.trim())
    .map((line) => line.split(''))

const antinodes = new Set()

const posKey = (row, col) => `${row},${col}`

const isValidPos = (row, col) =>
    row >= 0 && row < map.length && col >= 0 && col < map[0].length

const calculateAntinodes = (antenna1, antenna2) => {
    const [row1, col1] = antenna1
    const [row2, col2] = antenna2

    const deltaRow = row2 - row1
    const deltaCol = col2 - col1

    const directions = [
        { startRow: row1, startCol: col1, dRow: deltaRow, dCol: deltaCol },
        { startRow: row2, startCol: col2, dRow: -deltaRow, dCol: -deltaCol },
    ]

    for (const { startRow, startCol, dRow, dCol } of directions) {
        let row = startRow + dRow
        let col = startCol + dCol

        while (isValidPos(row, col)) {
            antinodes.add(posKey(row, col))
            row += dRow
            col += dCol
        }
    }
}

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        const currentValue = map[row][col]
        if (currentValue !== '.') {
            for (let otherRow = 0; otherRow < map.length; otherRow++) {
                for (let otherCol = 0; otherCol < map[0].length; otherCol++) {
                    if (
                        map[otherRow][otherCol] === currentValue &&
                        (row !== otherRow || col !== otherCol)
                    ) {
                        calculateAntinodes([row, col], [otherRow, otherCol])
                    }
                }
            }
        }
    }
}

console.log(antinodes.size)
