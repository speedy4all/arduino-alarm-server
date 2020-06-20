const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const readFileAsync = async (fileName) => {
  const res = await readFile(fileName);
  const json = await JSON.parse(res);
  
  return json;
};

const writeFileAsync = async (fileName, data) => {
  const content = await readFileAsync(fileName);
  content.push(data);
  await writeFile(fileName, JSON.stringify(content));
  
  return content;
};

exports.readFile = readFileAsync;
exports.writeFile = writeFileAsync;
