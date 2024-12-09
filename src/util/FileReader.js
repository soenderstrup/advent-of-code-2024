const fs = require('fs')

class FileReader {
    read(filePath) {
        try {
            return fs.readFileSync(filePath, 'utf8')
        } catch (err) {
            console.error(err)
        }
    }

    parseTwoColumns(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8')

            // Split the data into lines
            const lines = data.split('\n')

            // Process each line to extract numbers
            const parsedInput = lines.map((line) => {
                const [first, second] = line.trim().split(/\s+/).map(Number)
                return { first, second }
            })

            return parsedInput
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = FileReader
