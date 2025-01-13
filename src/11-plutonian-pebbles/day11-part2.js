const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
let stones = new FileReader()
    .read(filePath)
    .split(' ')
    .map((n) => Number(n))

function blink(stones) {
    const newStones = []
    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i]
        const stoneString = '' + stone
        if (stone === 0) {
            newStones[newStones.length] = 1
        } else if (stoneString.length % 2 === 0) {
            const leftStone = parseInt(
                stoneString.slice(0, stoneString.length / 2)
            )
            const rightStone = parseInt(
                stoneString.slice(stoneString.length / 2, stoneString.length)
            )
            newStones[newStones.length] = leftStone
            newStones[newStones.length] = rightStone
        } else {
            newStones[newStones.length] = stone * 2024
        }
    }
    return newStones
}

for (let i = 1; i <= 25; i++) {
    stones = blink(stones)
    console.log(i)
}

console.log(stones.length)
