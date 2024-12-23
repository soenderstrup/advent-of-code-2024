const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath).split('')

function format(diskMap) {
    let denseFormat = []
    let ID = 0
    for (let i = 0; i < diskMap.length; i++) {
        const digit = Number(diskMap[i])
        for (let j = 0; j < digit; j++) {
            if (i % 2 === 0) {
                denseFormat.push(ID)
            } else {
                denseFormat.push('.')
            }
        }
        if (i % 2 === 0) {
            ID++
        }
    }
    return denseFormat
}

function rearrange(blocksBefore) {
    const blocks = blocksBefore
    let i = 0
    let j = blocks.length - 1
    while (i < j) {
        if (blocks[i] === '.') {
            while (blocks[j] === '.') {
                j--
            }
            blocks[i] = blocks[j]
            blocks[j] = '.'
            i++
            j--
        } else {
            i++
        }
    }
    return blocks
}

const blocks = format(data)
const rearrangedBlocks = rearrange(blocks)
let checksum = 0
for (let i = 0; i < rearrangedBlocks.length; i++) {
    const block = rearrangedBlocks[i]
    if (block === '.') {
        break
    }
    checksum += i * Number(block)
}
console.log(checksum)
