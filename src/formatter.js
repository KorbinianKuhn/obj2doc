const space = spaces => ' '.repeat(spaces);
exports.space = space;

const tab = (tabs, spaces = 2) => space(spaces).repeat(tabs);
exports.tab = tab;

const insert = (tabs, string, spaces = 2) => string.replace(/\n/g, `\n${tab(tabs, spaces)}`);
exports.insert = insert;

const line = (string, tabs = 0) => `\n${tab(tabs)}${string}`;
exports.line = line;
