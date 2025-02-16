const { error } = require("console");
const fs = require("fs"),
  path = require("path");

const setData = (filePath, data) => {
  data = JSON.stringify(data);

  if (!data) return false;

  try {
    fs.writeFileSync(
      path.join(__dirname, "../data", filePath + ".json"),
      data,
      { encoding: "utf8" }
    );
  } catch (error) {
    console.log(error);
  }
  return true;
};

module.exports = setData;
