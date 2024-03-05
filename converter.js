function mdConverter(inputMd) {

    const boldPattern = /\*\*(\S(?:.*?\S)?)\*\*/g;
    const italicPattern = /_(\S(?:.*?\S)?)_/g;
    const monospacedPattern = /`(\S(?:.*?\S)?)`/g;

    inputMd = inputMd.replace(boldPattern, '<b>$1</b>');
    inputMd = inputMd.replace(italicPattern, '<i>$1</i>');
    inputMd = inputMd.replace(monospacedPattern, '<tt>$1</tt>');

    let paragraphs = inputMd.split('\n{2,}');

    let outputBuilder = '';
    for (let paragraph of paragraphs) {
        if (paragraph !== '') {
            outputBuilder += '<p>' + paragraph + '</p>\n';
        }
    }
    inputMd = outputBuilder;
    
    return inputMd;
}

module.exports = { mdConverter };