'use strict'

const definePath = require('../utils/relativePath')
const defaultFolder = require('../utils/defaultFolder')

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'folder',
      message: '\x1b[2m (The component will be placed in a `component` folder inside your app) \n \x1b[0m What is the name of your app folder?',
      default: defaultFolder()
     },{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['Stateless Function', 'ES6 Class (Pure)', 'ES6 Class'],
    }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button'
   }, {
    type: 'confirm',
    name: 'styles',
    message: 'Do you want styled components?',
    default: true
   },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'ES6 Class': {
        componentTemplate = './templates/component/es6.js.hbs';
        break;
      }
      case 'ES6 Class (Pure)': {
        componentTemplate = './templates/component/es6.pure.js.hbs';
        break;
      }
      case 'Stateless Function': {
        componentTemplate = './templates/component/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './templates/component/es6.js.hbs';
      }
    }

    const actions = [{
      type: 'add',
      path: definePath(data.folder, `/components/{{properCase name}}/index.js`),
      templateFile: componentTemplate,
      abortOnFail: true,
    }];

    if (data.styles) {
      actions.push({
        type: 'add',
        path: definePath(data.folder, `/components/{{properCase name}}/styles.js`),
        templateFile: './templates/component/styles.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
}
