const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath).split('')

function format(diskMap) {
    let denseBlocks = []
    let ID = 0
    for (let i = 0; i < diskMap.length; i++) {
        const digit = Number(diskMap[i])
        for (let j = 0; j < digit; j++) {
            if (i % 2 === 0) {
                denseBlocks.push(ID)
            } else {
                denseBlocks.push('.')
            }
        }
        if (i % 2 === 0) {
            ID++
        }
    }
    return denseBlocks
}

function rearrange(blocksBefore) {
    const blocks = [...blocksBefore]
    let currentBlockID = blocks[blocks.length - 1]
    let blockSize = 0
    for (let i = blocks.length - 1; i > 0; i--) {
        let block = blocks[i]
        if (block === '.' || block !== currentBlockID) {
            continue
        }
        if (block === currentBlockID) {
            blockSize++
        }
        if (block !== blocks[i - 1]) {
            let freeSpaceBlockSize = 0
            let freeSpaceStart = -1
            for (let j = 0; j <= i; j++) {
                if (blocks[j] !== '.') {
                    freeSpaceBlockSize = 0
                    freeSpaceStart = -1
                    continue
                }

                if (freeSpaceStart === -1) {
                    freeSpaceStart = j
                }
                freeSpaceBlockSize++

                if (freeSpaceBlockSize === blockSize) {
                    for (let k = 0; k < blockSize; k++) {
                        blocks[freeSpaceStart + k] = currentBlockID
                        blocks[i + k] = '.'
                    }
                    break
                }
            }

            currentBlockID--
            blockSize = 0
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
        continue
    }
    checksum += i * block
}
console.log(checksum)
