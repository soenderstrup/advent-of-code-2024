const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)
const lines = data.split('\n').map((line) => line.trim())

const blankLineIndex = lines.indexOf('')
const rules = lines.slice(0, blankLineIndex).map((rule) => {
    const [before, after] = rule.split('|').map((rulePart) => rulePart.trim())
    return { before, after }
})
const updates = lines
    .slice(blankLineIndex + 1, lines.length)
    .map((update) => update.split(',').map((updatePart) => updatePart.trim()))

const validUpdates = updates.filter((update) => isValid(update))
let middlePageNumberSum = 0
validUpdates.forEach(
    (update) =>
        (middlePageNumberSum += Number(update[Math.floor(update.length / 2)]))
)
console.log(middlePageNumberSum)

function isValid(update) {
    for (let { before, after } of rules) {
        const indexOfBefore = update.indexOf(before)

        if (indexOfBefore !== -1) {
            const indexOfAfter = update.indexOf(after)
            if (indexOfAfter !== -1 && indexOfBefore > indexOfAfter) {
                return false
            }
        }
    }
    return true
}
