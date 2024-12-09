function bubbleSort(list) {
    const sortedList = list;
    for (let i = 0; i < sortedList.length - 1; i++) {
        for (let j = 0; j < sortedList.length - i - 1; j++) {
            let k = sortedList[j];
            let e = sortedList[j + 1];
            if (e < k) {
                sortedList[j] = e;
                sortedList[j + 1] = k;
            }
        }
    }
    return sortedList;
}

module.exports = bubbleSort;