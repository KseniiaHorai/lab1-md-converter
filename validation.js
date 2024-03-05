function formPatternArray(pattern, outputHtml) {
    let array = [];
    let newPatten = new RegExp(pattern, 'gms');
    let result ;
    
    while ((result = newPatten.exec(outputHtml)) !== null) {
        array.push(result[1]);
    }

    return array;
}

function validateMarkdownNesting(firstPattern, secondPattern, array) {
    let newFitstPattern = new RegExp(firstPattern, 'gms');
    let newSecondPattern = new RegExp(secondPattern, 'gms');
    for (let item of array) {
        let firstResult = newFitstPattern.exec(item);
        let secondResult = newSecondPattern.exec(item);
        let isNested1 = firstResult !== null;
        let isNested2 = secondResult !== null;
        if (isNested1 || isNested2) {
            throw 'Invalid input: nested markdown';
        }
    }
}

module.exports = { formPatternArray, validateMarkdownNesting };