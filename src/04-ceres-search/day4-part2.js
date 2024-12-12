const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim().split(''))

let XMASCount = 0
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        const topLeftBottomRightLine =
            lines[i - 1]?.[j - 1] + lines[i][j] + lines[i + 1]?.[j + 1]
        const topRightBottomLeftLine =
            lines[i - 1]?.[j + 1] + lines[i][j] + lines[i + 1]?.[j - 1]
        if (
            (topLeftBottomRightLine === 'MAS' ||
                topLeftBottomRightLine === 'SAM') &&
            (topRightBottomLeftLine == 'MAS' ||
                topRightBottomLeftLine === 'SAM')
        )
            XMASCount++
    }
}

console.log(XMASCount)
