const raml2html = require('raml2html');
const obj2doc = require('../');
const utils = require('./utils');
const fs = require('fs');

const materialConfig = raml2html.getConfigForTheme('raml2html-material-theme');

describe('obj2doc()', () => {
  it('should return and build raml', () => {
    const raml = obj2doc(utils.example);
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
});
