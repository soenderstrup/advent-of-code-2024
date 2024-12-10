const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)

const lines = data.split('\n')

const reports = lines.map((line) => line.split(' ').map(Number))

let numberOfSafeReports = 0
for (let report of reports) {
    console.log('Initial report: ', report)

    const badLevelIndex = findBadLevelIndex(report)
    if (badLevelIndex === -1) {
        numberOfSafeReports++
    } else {
        let lists
        for (let i = 0; i < report.length; i++) {
            lists = report.filter((_, index) => index != i)
            console.log('Permutation: ', lists)
            const badLevelIndex = findBadLevelIndex(lists)
            if (badLevelIndex === -1) {
                numberOfSafeReports++
                break
            }
        }
    }
}

console.log(numberOfSafeReports)
console.log(reports.length)

function findBadLevelIndex(report) {
    const increasing = report[0] < report[1]
    for (let i = 0; i < report.length - 1; i++) {
        const increasingLevelError =
            increasing &&
            (report[i] >= report[i + 1] || report[i] + 3 < report[i + 1])

        const decreasingLevelError =
            !increasing &&
            (report[i] <= report[i + 1] || report[i] - 3 > report[i + 1])

        if (increasingLevelError || decreasingLevelError) {
            return i
        }
    }
    return -1
}
