// import the requirements.
import inquirer from 'inquirer';
import fs from 'fs';
import { Circle, Triangle, Square } from './lib/shapes.js';

//the questions for the user input.
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo (up to 3 characters):',
        validate: input => input.length <= 3 || 'Text must be up to 3 characters.'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (color keyword or hexadecimal number):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo:',
        choices: ['Circle', 'Triangle', 'Square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (color keyword or hexadecimal number):'
    }
];

// prompt the user with the question and handle the answer.
inquirer.prompt(questions).then(answers => {
    const { text, textColor, shape, shapeColor } = answers;

    let shapeInstance;
    if (shape === 'Circle') {
        shapeInstance = new Circle();
    } else if (shape === 'Triangle') {
        shapeInstance = new Triangle();
    } else {
        shapeInstance = new Square();
    }
    shapeInstance.setColor(shapeColor);

// Define the SVG content. 
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    ${shapeInstance.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
    `;

//put the SVG content in a file.
    fs.writeFileSync('logo.svg', svgContent.trim());
    console.log('Generated logo.svg');
});
