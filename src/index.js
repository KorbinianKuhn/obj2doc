const raml = require('./raml');

exports.obj2doc = (object, options = {}) => raml.create(object, options);
