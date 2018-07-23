const formatter = require('./formatter');
const _ = require('lodash');

const RAML_SIMPLE_KEYS = [
  'description',
  'required',
  'minLength',
  'maxLength',
  'type',
  'array',
  'pattern',
  'minimum',
  'maximum'
];
const RAML_INDENT_KEYS = ['body', 'application/json'];

const line = (tabs, key, value, required = false) => {
  if (!_.isNil(value)) {
    return formatter.line(`${key}: ${value}`, tabs);
  } else if (required) {
    return formatter.line(`${key}:`);
  } else {
    return '';
  }
};

const headerLine = (tabs, key) => formatter.line(`${key}:`, tabs);

const header = object => {
  let string = '#%RAML 1.0';
  for (const key of ['title', 'version', 'baseUri', 'mediaType']) {
    string += line(0, key, object[key], false);
  }
  return string;
};

const routeToString = (tabs, route) => {
  let string = '';

  string += headerLine(tabs + 0, route.method);
  string += line(tabs + 1, 'description', route.description, false);

  if (route.uriParameters)
    string += createBlock(tabs + 1, 'uriParameters', route.uriParameters);
  if (route.queryParameters)
    string += createBlock(tabs + 1, 'queryParameters', route.queryParameters);
  if (route.body) string += createBlock(tabs + 1, 'body', route.body);

  if (route.responses && Object.keys(route.responses).length > 0) {
    string += createBlock(tabs + 1, 'responses', route.responses);
  }

  return string;
};

const uri = string => {
  let params = string.split('/');
  params.shift();
  params = params.map(o => {
    if (o.startsWith(':')) {
      return `{${o.replace(':', '')}}`;
    }
    return o;
  });
  return `/${params.join('/')}`;
};

const createBlock = (tabs, name, parameters) => {
  let string = '';
  if (parameters && Object.keys(parameters).length > 0) {
    string += headerLine(tabs, name);
    for (const param in parameters) {
      string += createType(tabs + 1, param, parameters[param]);
    }
  }
  return string;
};

const createType = (tabs, name, object) => {
  let string = '';
  string += headerLine(tabs, name);
  for (const key in object) {
    if (RAML_SIMPLE_KEYS.indexOf(key) !== -1) {
      string += line(tabs + 1, key, object[key]);
    } else if (RAML_INDENT_KEYS.indexOf(key) !== -1) {
      string += createType(tabs + 1, key, object[key]);
    } else if (key === 'properties') {
      string += headerLine(tabs + 1, 'properties');
      for (const property in object.properties) {
        string += createType(tabs + 2, property, object.properties[property]);
      }
    } else if (key === 'items') {
      string += createType(tabs + 1, 'items', object.items);
    } else if (key === 'enum') {
      string += line(tabs + 1, 'enum', `[${object.enum.join(', ')}]`);
    } else if (key === 'example') {
      string += createExample(tabs + 1, 'example', object.example);
    }
  }
  return string;
};

const createExample = (tabs, name, object) => {
  let string = '';
  string += line(tabs, name, '|');
  string += formatter.line('', tabs + 1);
  string += formatter.insert(tabs + 1, JSON.stringify(object, null, 2));
  return string;
};

const groupRoutes = routes => {
  const grouped = {};
  for (const route of routes) {
    const uristring = uri(route.uri);
    let temp = uristring.split('/');
    temp.shift();
    temp = temp.map(o => `/${o}`);
    const path = `${temp.join('.')}.endpoints`;
    const endpoints = _.get(grouped, path, []);
    delete route.uri;
    endpoints.push(route);
    _.set(grouped, path, endpoints);
  }

  return grouped;
};

const groupToString = (tabs, group) => {
  let string = '';
  for (const key in group) {
    if (key === 'endpoints') {
      for (const endpoint of group.endpoints) {
        string += routeToString(tabs, endpoint);
      }
    } else {
      string += headerLine(tabs, key);
      string += groupToString(tabs + 1, group[key]);
    }
  }
  return string;
};
const create = object => {
  let string = header(object);

  if (object.routes) {
    const routes = groupRoutes(object.routes);
    string += groupToString(0, routes);
  }

  return string;
};

exports.create = create;
