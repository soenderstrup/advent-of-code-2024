const path = require('path')
const FileReader = require('../util/FileReader')

const filePath = path.join(__dirname, 'input.txt')
const data = new FileReader().read(filePath)

const lines = data.split('\n')

const reports = lines.map((line) => line.split(' ').map(Number))

let numberOfSafeReports = reports.length
for (let report of reports) {
    console.log('Initial report: ', report)

    const badLevelIndex = findBadLevelIndex(report)
    if (badLevelIndex !== -1) {
        console.log('Initial index', badLevelIndex)
        const leftConflictingLevelRemovedReport = report.filter(
            (_, index) => index != badLevelIndex
        )
        const rightConflictingLevelRemovedReport = report.filter(
            (_, index) => index != badLevelIndex + 1
        )
        console.log('Left report: ', leftConflictingLevelRemovedReport)
        console.log('right report: ', rightConflictingLevelRemovedReport)
        const leftConflictingLevelBadLevelIndex = findBadLevelIndex(
            leftConflictingLevelRemovedReport
        )
        const rightConflictingLevelBadLevelIndex = findBadLevelIndex(
            rightConflictingLevelRemovedReport
        )
        console.log('Left index: ', leftConflictingLevelBadLevelIndex)
        console.log('Right index: ', rightConflictingLevelBadLevelIndex)
        if (
            leftConflictingLevelBadLevelIndex !== -1 &&
            rightConflictingLevelBadLevelIndex !== -1
        ) {
            numberOfSafeReports--
            console.log('Unsafe')
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
