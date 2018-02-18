# obj2doc

[![Travis](https://img.shields.io/travis/KorbinianKuhn/obj2doc.svg?style=flat-square)](https://travis-ci.org/KorbinianKuhn/obj2doc/builds)
[![Coverage](http://img.shields.io/coveralls/KorbinianKuhn/obj2doc.svg?style=flat-square&branch=master)](https://coveralls.io/r/KorbinianKuhn/obj2doc)
[![Known Vulnerabilities](https://snyk.io/test/github/KorbinianKuhn/obj2doc/badge.svg?style=flat-square)](https://snyk.io/test/github/KorbinianKuhn/obj2doc)
[![Dependencies](https://img.shields.io/david/KorbinianKuhn/obj2doc.svg?style=flat-square)](https://david-dm.org/KorbinianKuhn/obj2doc)
[![Dev Dependencies](https://img.shields.io/david/dev/KorbinianKuhn/obj2doc.svg?style=flat-square)](https://david-dm.org/KorbinianKuhn/obj2doc)
[![npm](https://img.shields.io/npm/dt/@korbiniankuhn/obj2doc.svg?style=flat-square)](https://www.npmjs.com/package/@korbiniankuhn/obj2doc)
[![npm-version](https://img.shields.io/npm/v/@korbiniankuhn/obj2doc.svg?style=flat-square)](https://www.npmjs.com/package/@korbiniankuhn/obj2doc)
![license](https://img.shields.io/github/license/KorbinianKuhn/obj2doc.svg?style=flat-square)


Convert js/json objects to API documentation formats.
Supported formats:

- RAML

## Installation

For installation use the [Node Package Manager](https://github.com/npm/npm):

```
$ npm install --save @korbiniankuhn/obj2doc
```

or clone the repository:

```
$ git clone https://github.com/KorbinianKuhn/obj2doc
```

## Getting started

``` javascript
obj2doc(object, { type: 'raml' });
// return raml string
```

## Testing

First you have to install all dependencies:

```
$ npm install
```

To execute all unit tests once, use:

```
$ npm test
```

To get information about the test coverage, use:

```
$ npm run coverage
```

## Contribution

Get involved and push in your ideas.

Do not forget to add corresponding tests to keep up 100% test coverage.

## License

The MIT License

Copyright (c) 2018 Korbinian Kuhn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.