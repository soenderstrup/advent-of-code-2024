const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim())
const map = lines.map((line) => line.split(''))
const antinodes = new Set()

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        const posValue = map[row][col]
        if (posValue !== '.') {
            findAntinodes(row, col, posValue)
        }
    }
}

console.log(antinodes.size)

function findAntinodes(antennaRow, antennaCol, antennaValue) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            const posValue = map[row][col]
            const isAnotherAntennaWithSameValue =
                posValue === antennaValue &&
                row !== antennaRow &&
                col !== antennaCol
            if (isAnotherAntennaWithSameValue) {
                const deltaRow = Math.abs(row - antennaRow)
                const deltaCol = Math.abs(col - antennaCol)

                const possibleAntiNodes = []
                possibleAntiNodes.push({
                    row: row < antennaRow ? row - deltaRow : row + deltaRow,
                    col: col < antennaCol ? col - deltaCol : col + deltaCol,
                })
                possibleAntiNodes.push({
                    row:
                        antennaRow < row
                            ? antennaRow - deltaRow
                            : antennaRow + deltaRow,
                    col:
                        antennaCol < col
                            ? antennaCol - deltaCol
                            : antennaCol + deltaCol,
                })

                for (let possibleAntiNode of possibleAntiNodes) {
                    const possibleAntiNodePosKey = posKey(
                        possibleAntiNode.row,
                        possibleAntiNode.col
                    )
                    if (
                        isValidPos(
                            possibleAntiNode.row,
                            possibleAntiNode.col
                        ) &&
                        !antinodes.has(possibleAntiNodePosKey)
                    ) {
                        antinodes.add(possibleAntiNodePosKey)
                    }
                }
            }
        }
    }
}

function posKey(row, col) {
    return row + ',' + col
}

function isValidPos(row, col) {
    return 0 <= row && row < map.length && 0 <= col && col < map[0].length
}
