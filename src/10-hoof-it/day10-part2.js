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

function calcTrailRating(row, col, score = 0) {
    if (map[row]?.[col] !== score) {
        return 0
    } else if (map[row][col] === 9) {
        return 1
    } else {
        const nextScore = score + 1
        return (
            calcTrailRating(row, col + 1, nextScore) +
            calcTrailRating(row, col - 1, nextScore) +
            calcTrailRating(row + 1, col, nextScore) +
            calcTrailRating(row - 1, col, nextScore)
        )
    }
}

console.time()
let trailheadScores = 0
for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        if (map[row][col] === 0) {
            trailheadScores += calcTrailRating(row, col)
        }
    }
}

console.log(trailheadScores)
console.timeEnd()
