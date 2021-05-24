// TODO: Create a function to generate markdown for README
const generateMarkdown = (answers) =>
`# ${answers.title}

## Badges

![Github license](https://img.shields.io/badge/license-${answers.license}-blue.svg)

## Description

${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install dependancies, run the following command:

${answers.instructions}

## Usage

${answers.usage}

## License

This project is licensed under the ${answers.license} license.

## Contributing

${answers.contribution}

## Tests

To run tests, use the following command:

${answers.test}

## Questions

If you have any questions about the repo or the project, you can contact me at ${answers.email}.
You can find more of my work at [JessLuff](https://github.com/${answers.name}/).
`;

module.exports = generateMarkdown;
