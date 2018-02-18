const formatter = require('./formatter');

const RAML_SIMPLE_KEYS = ['description', 'required', 'minLength', 'maxLength', 'type', 'array', 'pattern', 'minimum', 'maximum'];
const RAML_INDENT_KEYS = ['body', 'application/json'];

const line = (tabs, key, value, required = false) => {
  if (value) {
    return formatter.line(`${key}: ${value}`, tabs);
  } else if (required) {
    return formatter.line(`${key}:`);
  } else {
    return '';
  }
};

const headerLine = (tabs, key) => formatter.line(`${key}:`, tabs);

const header = (object) => {
  let string = '#%RAML 1.0';
  for (const key of ['title', 'version', 'baseUri', 'mediaType']) {
    string += line(0, key, object[key], false);
  }
  return string;
};

const routesToString = (routes) => {
  let all = '';
  for (const route of routes) {
    let string = '\n';

    string += headerLine(0, uri(route.uri));
    string += headerLine(1, route.method);
    string += line(2, 'description', route.description, true);

    if (route.request) {
      if (route.request.uriParameters) string += createBlock(2, 'uriParameters', route.request.uriParameters);
      if (route.request.queryParameters) string += createBlock(2, 'queryParameters', route.request.queryParameters);
      if (route.request.body) string += createBlock(2, 'body', route.request.body);
    }

    if (route.response && Object.keys(route.response).length > 0) {
      string += createBlock(2, 'responses', route.response);
    }

    all += string;
  }
  return all;
};

const uri = (string) => {
  let params = string.split('/');
  params.shift();
  params = params.map((o) => {
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
      string += createType(tabs+1, param, parameters[param]);
    }
  }
  return string;
};

const createType = (tabs, name, object) => {
  let string = '';
  string += headerLine(tabs, name);
  for (const key in object) {
    if (RAML_SIMPLE_KEYS.indexOf(key) !== -1) {
      string += line(tabs+1, key, object[key]);
    } else if (RAML_INDENT_KEYS.indexOf(key) !== -1) {
      string += createType(tabs+1, key, object[key]);
    } else if (key === 'properties') {
      string += headerLine(tabs+1, 'properties');
      for (const property in object.properties) {
        string += createType(tabs+2, property, object.properties[property]);
      }
    } else if (key === 'items') {
      string += createType(tabs+1, 'items', object.items);
    } else if (key === 'enum') {
      string += line(tabs+1, 'enum', `[${object.enum.join(', ')}]`);
    } else if (key === 'example') {
      string += createExample(tabs+1, 'example', object.example);
    }
  }
  return string;
};

const createExample = (tabs, name, object) => {
  let string = '';
  string += line(tabs, name, '|');
  string += formatter.line('', tabs+1);
  string += formatter.insert(tabs+1, JSON.stringify(object, null, 2));
  return string;
};

const create = (object, options) => {
  let string = header(object);

  string += routesToString(object.routes);

  return string;
};

exports.create = create;
