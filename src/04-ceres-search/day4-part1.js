const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim().split(''))
const xDir = [0, 1, 1, 1, 0, -1, -1, -1]
const yDir = [-1, -1, 0, 1, 1, 1, 0, -1]

let XMASCount = 0
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        for (n = 0; n < xDir.length; n++) {
            const word =
                lines[i][j] +
                lines[i + yDir[n]]?.[j + xDir[n]] +
                lines[i + yDir[n] * 2]?.[j + xDir[n] * 2] +
                lines[i + yDir[n] * 3]?.[j + xDir[n] * 3]
            if (word === 'XMAS') XMASCount++
        }
    }
}

console.log(XMASCount)
