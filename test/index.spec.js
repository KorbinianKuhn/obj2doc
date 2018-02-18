const raml2html = require('raml2html');
const obj2doc = require('../');
const utils = require('./utils');
const fs = require('fs');
const should = require('should');

const materialConfig = raml2html.getConfigForTheme('raml2html-material-theme');

describe('obj2doc()', () => {
  it.skip('should return and build raml', () => {
    const raml = obj2doc(utils.example, { type: 'raml' });
    console.log(raml);
    fs.writeFileSync('temp/automatic-api.raml', raml);
    raml2html.render('temp/automatic-api.raml', materialConfig)
      .then((html) => {
        fs.writeFile('temp/automatic-api.html', html, (err) => {
          console.log(err);
        });
      })
      .catch(error => console.error(error));
  });

  it('should build correct raml string', () => {
    const actual = obj2doc(utils.example, { type: 'raml' });
    const expected = fs.readFileSync('test/examples/raml/full.raml').toString();
    actual.should.equal(expected);
  });
});
