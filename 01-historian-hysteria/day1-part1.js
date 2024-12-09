const path = require('path');
const FileReader = require('../util/FileReader');
const bubbleSort = require("../util/sorting");

const filePath = path.join(__dirname, 'input.txt');
const fileReader = new FileReader(filePath);
const parsedData = fileReader.parseTwoColumns();

let leftList = [];
let rightList = [];

for (let line of parsedData) {
    leftList.push(line.first);
    rightList.push(line.second);
}

const sortedLeftList = bubbleSort(leftList);
const sortedRightList = bubbleSort(rightList);

let totalDistance = 0;
for (let i = 0; i < sortedLeftList.length; i++) {
    totalDistance += Math.abs(sortedLeftList[i] - sortedRightList[i]);
}

console.log(totalDistance);