const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const readFileAsync = async (fileName) => {
  try {
    const res = await readFile(fileName);
    const json = await JSON.parse(res);

    return json;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const writeFileAsync = async (fileName, data) => {
  try {
    const content = await readFileAsync(fileName);
    content.push(data);
    await writeFile(fileName, JSON.stringify(content));

    return content;
  } catch (e) {
    return null;
  }
};

exports.readFile = readFileAsync;
exports.writeFile = writeFileAsync;
