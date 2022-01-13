import fs from "fs";

/**
 * Get JSON data from ./data folder * @param {string} filename
 * @returns {Object}
 */
export default function importJSONData(filename) {
  let name;
  if (!filename.endsWith(".json")) {
    name = filename + ".json";
  } else {
    name = filename;
  }
  
  const stringJSON = fs.readFileSync(`./data/${name}`);
  const parsedJSONObject = JSON.parse(stringJSON);
  
  return parsedJSONObject;
}