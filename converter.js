const { formPatternArray, validateMarkdownNesting, validateMarkdownCompletion } = require('./validation.js');

function mdConverter(inputMd) {

    const boldPattern = /\*\*(\S(?:.*?\S)?)\*\*/g;
    const italicPattern = /_(\S(?:.*?\S)?)_/g;
    const monospacedPattern = /`(\S(?:.*?\S)?)`/g;

    let fencedCodeBlocks = [];
    let outputHtml = inputMd;

    let fencedCodeMatch;
    let tempString = '';
    let preIndex = 0;

    while ((fencedCodeMatch = /(^\\n?|^)```(.*?)```(\\n?|$)/ms.exec(outputHtml)) !== null) {
        fencedCodeBlocks.push(fencedCodeMatch[2]);
        let tempRepl =  'replaceFencedCode' + preIndex++;
        tempString += outputHtml.substring(0, fencedCodeMatch.index) + tempRepl;
        outputHtml = outputHtml.substring(fencedCodeMatch.index + fencedCodeMatch[0].length);
    }

    outputHtml = tempString + outputHtml;
    let validationHtml = outputHtml;

    let boldArray = formPatternArray(boldPattern, outputHtml);
    validateMarkdownNesting(italicPattern, monospacedPattern, boldArray);

    let italicArray = formPatternArray(italicPattern, outputHtml);
    validateMarkdownNesting(boldPattern, monospacedPattern, italicArray);

    let monospacedArray = formPatternArray(monospacedPattern, outputHtml);
    validateMarkdownNesting(boldPattern, italicPattern, monospacedArray);

    validationHtml = validationHtml.replace(boldPattern, 'boldBlock');
    validationHtml = validationHtml.replace(italicPattern, 'italicBlock');
    validationHtml = validationHtml.replace(monospacedPattern, 'monospacedBlock');

    validateMarkdownCompletion(validationHtml);

    outputHtml = outputHtml.replace(boldPattern, '<b>$1</b>');
    outputHtml = outputHtml.replace(italicPattern, '<i>$1</i>');
    outputHtml = outputHtml.replace(monospacedPattern, '<tt>$1</tt>');

    let paragraphs = outputHtml.split(/\n\s*\n/);

    let outputBuilder = '';
    for (let paragraph of paragraphs) {
        if (paragraph.trim() !== '') {
            outputBuilder += '<p>' + paragraph.trim() + '</p>\n';
        }
    }
    outputHtml = outputBuilder;
    for (let i = 0; i < fencedCodeBlocks.length; i++) {
        outputHtml = outputHtml.replace('replaceFencedCode' + i, '<pre>' + fencedCodeBlocks[i] + '</pre>');
    }
    
    return outputHtml;
}

module.exports = { mdConverter };