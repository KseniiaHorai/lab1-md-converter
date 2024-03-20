# Markdown to HTML/ANSI converter

The Markdown to HTML/ANSI Converter is a command-line tool that  converts Markdown documents into HTML or ANSI format. It simplifies the process of formatting text by automatically translating Markdown syntax into corresponding HTML or ANSI markup.

## Functionality

The application takes a Markdown file as input and generates HTML/ANSI output. It supports basic Markdown syntax for formatting text, including:

- **Bold**: Enclosed with double asterisks (\*\*bold text\*\*)
- **Italic**: Enclosed with underscores (\_italic text\_)
- **Monospaced**: Enclosed with backticks (\`monospaced text\`)
- **Preformatted Text**: Enclosed with triple backticks (\`\`\`preformatted text\`\`\`)
- **Paragraphs**: Separated by a blank line or two consecutive newline characters

## Usage

### Building and Running the Project

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd lab1-md-converter
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    node program.js <markdown_file_path> [--out <output_file_path>] [--format=<ansi_or_html>]
    ```

**Run tests:**
    ```
    npm test
    ```
## User Instructions

1. Ensure you have Node.js installed on your system.
2. Clone the repository to your local machine.
3. Open a terminal or command prompt.
4. Navigate to the project directory using the `cd` command.
5. Install the required dependencies by running `npm install`.
6. Once the dependencies are installed, you can use the program to convert Markdown files to HTML/ANSI.
7. Run the program by executing `node program.js <markdown_file_path> [--out <output_file_path>] [--format=<ansi_or_html>]`.
8. If successful, the HTML/ANSI output will be displayed in the terminal or saved to the specified output file. If any errors occur during conversion, appropriate error messages will be shown.

_!Note that if you don't specify the format of the output, you will receive ANSI in the command line and HTML in your document._

## Repository Structure

*   **program.js**: Main application file
*   **converter.js**: Module containing Markdown to HTML/ANSI conversion logic
*   **validation.js**: Module containing functions for validating Markdown syntax
*   **input.md**: Sample input Markdown file
*   **test-converter.yml**: Defines the workflow
*   **converter.test.js**: Module containing tests for HTML/ANSI conversion logic
*   **patterns.js**: Stores regular expression patterns

## Revert Commits

The repository contains revert commits 

You can find them here:

[Lab1](https://github.com/KseniiaHorai/lab1-md-converter/commit/65bb91fd99e3e8764786ce382922a25bc66b2d77)
[Lab2](https://github.com/KseniiaHorai/lab1-md-converter/commit/5f9ae9af1944fa7964f02a8f91e0708200ee5794)

## Failed CI tests

[Failure](https://github.com/KseniiaHorai/lab1-md-converter/commit/d34c52c9ecdbebad68582985f872586f37422281)

## Conclusion

It was my first time writing test code, and now I have a better understanding of what testing is really like. I realized that while it may be difficult to create a good set of tests at the moment, this hard work pays off in the future. 

I’ve never worked with GitHub Actions either. The fact that code can be run automatically by a computer for every commit has really impressed me. 
However, it seems like the importance of tests would be more apparent in programs that you work on for a long time and with other people. Since the converter is a relatively small project, I think it would be possible to make do with testing the program by hand.      

So, while it might not be 100% necessary for every case, I can definitely see the value of tests, especially as projects grow.

 
