'use strict'
const definePath = require('../utils/relativePath')
const defaultFolder = require('../utils/defaultFolder')

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'folder',
    message: '\x1b[2m (The container will be placed in a `container/templates` folder inside your app) \n \x1b[0m What is the name of your app folder?',
    default: defaultFolder()
   },{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
  }, {
    type: 'list',
    name: 'component',
    message: 'Select a base component:',
    default: 'PureComponent',
    choices: () => ['PureComponent', 'Component'],
  }, {
    type: 'confirm',
    name: 'wantHeaders',
    default: false,
    message: 'Do you want headers?',
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors/reducer tuple for this container?',
  }],
  
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: definePath(data.folder, `/containers/{{properCase name}}/index.js`),
      templateFile: './templates/container/index.js.hbs',
      abortOnFail: true,
    }];

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: definePath(data.folder, `/containers/{{properCase name}}/actions.js`),
        templateFile: './templates/container/actions.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: definePath(data.folder, `/containers/{{properCase name}}/constants.js`),
        templateFile: './templates/container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: definePath(data.folder, `/containers/{{properCase name}}/selectors.js`),
        templateFile: './templates/container/selectors.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: definePath(data.folder, `/containers/{{properCase name}}/reducer.js`),
        templateFile: './templates/container/reducer.js.hbs',
        abortOnFail: true,
      });

    return actions;
    }
  }
};
