# Markdown to HTML converter

The Markdown to HTML Converter is a command-line tool that  converts Markdown documents into HTML format. It simplifies the process of formatting text by automatically translating Markdown syntax into corresponding HTML markup.

## Functionality

The application takes a Markdown file as input and generates HTML output. It supports basic Markdown syntax for formatting text, including:

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
    node program.js <markdown_file_path> [--out <output_file_path>]
    ```

### Handling Invalid Markdown

If the input Markdown file contains invalid syntax, the application will output an error message to stderr and exit with a non-zero exit code.

Repository Structure
--------------------

*   **program.js**: Main application file
*   **converter.js**: Module containing Markdown to HTML conversion logic
*   **validation.js**: Module containing functions for validating Markdown syntax
*   **input.md**: Sample input Markdown file

Revert Commit
-------------

The repository contains a revert commit 
You can find it [here](https://github.com/KseniiaHorai/lab1-md-converter/commit/65bb91fd99e3e8764786ce382922a25bc66b2d77).