const raml = require('./raml');

exports.obj2doc = (object, options = {}) => {
  switch (options.type) {
    case 'raml':
      return raml.create(object, options);
    default:
      throw new Error('Documentation type is not supported.');
  }
};
