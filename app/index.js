// #!/usr/bin/env node

const dirPath = `${__dirname}`

const componentGenerator = require(`${dirPath}/generators/component`)
const containerGenerator = require(`${dirPath}/generators/container`)

module.exports = (plop) => {
  plop.setGenerator('Component', componentGenerator);
  plop.setGenerator('Container', containerGenerator);
};
