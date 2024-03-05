const { mdConverter } = require('./converter.js');

function main() {

    const args = process.argv.slice(2)
    if (args.length < 1) {
        console.error("Usage: node program.js <markdown_file_path> [--out <output_file_path>]");
        process.exit(1);
    }
    let inputFilePath = args[0];
    let outputFilePath = null;

    if (args.length > 1 && args[1] === "--out") {
        if (args.length < 3) {
            console.error('No path found');
            process.exit(1);
        }
        outputFilePath = args[2];
    }

    let markdownContent = require('fs').readFileSync(inputFilePath, 'utf8');
    let htmlContent = mdConverter(markdownContent);
    if (outputFilePath !== null) {
        require('fs').writeFileSync(outputFilePath, htmlContent);
        console.log('Results in ' + outputFilePath);
    } else {
        console.log(htmlContent);
    }
}

main();