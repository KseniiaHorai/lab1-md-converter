const { formPatternArray, validateMarkdownNesting, validateMarkdownCompletion } = require('./validation.js');
const { tagPatterns, patterns } = require('./patterns.js');

function mdConverter(inputMd, format) {

    let fencedCodeBlocks = [];
    let outputHtml = inputMd;

    let fencedCodeMatch;
    let tempString = '';
    let preIndex = 0;

    const newTagPatterns = {
        bold: tagPatterns.bold[format],
        italic: tagPatterns.italic[format],
        monospaced: tagPatterns.monospaced[format],
        preformatted: tagPatterns.preformatted[format],
        paragraph: tagPatterns.paragraph[format]
    };

    while ((fencedCodeMatch = patterns.preformattedPattern.exec(outputHtml)) !== null) {
        fencedCodeBlocks.push(fencedCodeMatch[2]);
        let tempRepl =  'replaceFencedCode' + preIndex++;
        tempString += outputHtml.substring(0, fencedCodeMatch.index) + tempRepl;
        outputHtml = outputHtml.substring(fencedCodeMatch.index + fencedCodeMatch[0].length);
    }

    outputHtml = tempString + outputHtml;
    let validationHtml = outputHtml;

    let boldArray = formPatternArray(patterns.boldPattern, outputHtml);
    validateMarkdownNesting(patterns.italicPattern, patterns.monospacedPattern, boldArray);

    let italicArray = formPatternArray(patterns.italicPattern, outputHtml);
    validateMarkdownNesting(patterns.boldPattern, patterns.monospacedPattern, italicArray);

    let monospacedArray = formPatternArray(patterns.monospacedPattern, outputHtml);
    validateMarkdownNesting(patterns.boldPattern, patterns.italicPattern, monospacedArray);

    validationHtml = validationHtml.replace(patterns.boldPattern, 'boldBlock');
    validationHtml = validationHtml.replace(patterns.italicPattern, 'italicBlock');
    validationHtml = validationHtml.replace(patterns.monospacedPattern, 'monospacedBlock');

    validateMarkdownCompletion(validationHtml);

    outputHtml = outputHtml.replace(patterns.boldPattern, newTagPatterns.bold);
    outputHtml = outputHtml.replace(patterns.italicPattern, newTagPatterns.italic);
    outputHtml = outputHtml.replace(patterns.monospacedPattern, newTagPatterns.monospaced);

    let paragraphs = outputHtml.split(/\n\s*\n/);

    let outputBuilder = '';
    for (let paragraph of paragraphs) {
        if (paragraph.trim() !== '') {
            outputBuilder += newTagPatterns.paragraph.begin + paragraph.trim() + newTagPatterns.paragraph.end;
        }
    }
    outputHtml = outputBuilder;
    for (let i = 0; i < fencedCodeBlocks.length; i++) {
        outputHtml = outputHtml.replace('replaceFencedCode' + i, newTagPatterns.preformatted.begin + fencedCodeBlocks[i] + newTagPatterns.preformatted.end);
    }
    
    return outputHtml;
}

module.exports = { mdConverter };
