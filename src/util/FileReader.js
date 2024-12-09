const fs = require('fs');

class FileReader {
  constructor(filePath) {
    this.filePath = filePath;
  }

  parseTwoColumns() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');

      // Split the data into lines
      const lines = data.split('\n');

      // Process each line to extract numbers
      const parsedInput = lines.map(line => {
        const [first, second] = line.trim().split(/\s+/).map(Number);
        return { first, second };
      });

      return parsedInput;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = FileReader;