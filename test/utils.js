const _ = require('lodash');
const main = require('./examples/main.json');
const errors = require('./examples/errors.json');
const routes = require('./examples/routes.json');

const example = _.assign(
  {
    routes: []
  },
  main
);

for (const route of routes) {
  const object = _.cloneDeep(route);
  _.assign(object.responses, _.cloneDeep(errors));
  example.routes.push(object);
}

exports.example = example;
