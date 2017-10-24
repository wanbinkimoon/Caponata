#!/usr/bin/env node

const componentGenerator = require('./generators/component')
const containerGenerator = require('./generators/container')

module.exports = (plop) => {
  plop.setGenerator('Component', componentGenerator);
  plop.setGenerator('Container', containerGenerator);
};
