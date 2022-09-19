
function sortResult(arr) {
    let resultArr = []
    let groupedArr = []

    //SORTING ARRAY:RESULT ARRAY
    arr.sort()
    arr.reduce(function (r, current_item) {
        if (current_item !== r) {
            groupedArr.push([]);
        }
        groupedArr[groupedArr.length - 1].push(current_item);
        return current_item;
    }, undefined);

    groupedArr.forEach(x => {
        return resultArr.push({ [x[0]]: x.length })
    })

    return { resultArr }
}

function checkRules(arr, caseName) {
    let value = 0;
    let result = false;

    //yahtzee
    if (arr.length === 1 && caseName === "Yahtzee") {
        return {
            result: true,
            value: 50
        }
    }

    //brelan et carre
    if (caseName === "Brelan") {

    }

}

console.log(sortResult(diceArray))
console.log(sortResult(yahtzeeArray))