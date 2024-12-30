const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const map = new FileReader()
    .read(filePath)
    .split('\n')
    .map((line) =>
        line
            .trim()
            .split('')
            .map((char) => Number(char))
    )

function getPosKey(row, col) {
    return `${row},${col}`
}

function calcTrailScore(row, col, score = 0, posKeys = new Set()) {
    if (map[row]?.[col] !== score) {
        return 0
    } else if (map[row][col] === 9 && score === 9) {
        const posKey = getPosKey(row, col)
        if (!posKeys.has(posKey)) {
            posKeys.add(posKey)
            return 1
        } else {
            return 0
        }
    } else {
        const nextScore = score + 1
        return (
            calcTrailScore(row, col + 1, nextScore, posKeys) +
            calcTrailScore(row, col - 1, nextScore, posKeys) +
            calcTrailScore(row + 1, col, nextScore, posKeys) +
            calcTrailScore(row - 1, col, nextScore, posKeys)
        )
    }
}

console.time()
let trailheadScores = 0
for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        if (map[row][col] === 0) {
            trailheadScores += calcTrailScore(row, col)
        }
    }
}

console.log(trailheadScores)
console.timeEnd()
