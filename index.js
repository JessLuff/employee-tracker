// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Include generateMarkdown.js
const writeToFile = require('./utils/generateMarkdown');

const writeFileAsync = util.promisify(fs.writeFile);

// User input questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your Github username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a short description of your project.',
        },
        {
            type: 'list', //Change input of this, options: 
            name: 'license',
            message: 'What kind of license should your project have?', 
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
        },
        {
            type: 'input', //default to npm i
            name: 'instructions',
            message: 'How is this project installed?',
            default: 'npm i',
        },
        {
            type: 'input', //default to npm test
            name: 'test',
            message: 'How is this project tested?',
            default: 'npm test',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'How should this project be used?',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'How can this project be contributed to?',
        },
    ]);
};

// Function to initializes prompt then file creations
const init = () => {
    promptUser()
      .then((answers) => writeFileAsync('projectREADME.md', writeToFile(answers)))
      .then(() => console.log('Successfully wrote to projectREADME.md'))
      .catch((err) => console.error(err));
  };

// Function call to initialize app
init();
