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
            throw new Error('Invalid input: nested markdown');
        }
    }
}

function validateMarkdownCompletion(validationHtml) {

    const newValidationHtml = validationHtml;
    const wordsArray = newValidationHtml.split(/\s+/);

    if (isIncomplete(wordsArray, '```') ||
        isIncomplete(wordsArray, '**') ||
        isIncomplete(wordsArray, '_') ||
        isIncomplete(wordsArray, '`')
        ) {
        throw new Error('Invalid input: incomplete markdown');
    }
}

function isIncomplete(wordsArray, marker) {
    
    for (let word of wordsArray) {
        if(word.startsWith(marker)) {
            if(/^[a-zA-Zа-яА-Я]$/.test(word.charAt(marker.length))){
                return true;
            }
        }
    }
    
    return false;
}

module.exports = { formPatternArray, validateMarkdownNesting, validateMarkdownCompletion };