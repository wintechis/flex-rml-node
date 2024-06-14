const fs = require("fs");
const createModule = require("./flex.js");

async function mapData(input, rmlRule) {
  const Module = await createModule();

  // Create the input map
  const input_data = new Module.MapStringString();
  
  // Append input to wasm structure
  const keys = Object.keys(input);
  for (const key of keys) {
    input_data.set(key, input[key]);
  }

  // Call the method
  const result = Module.Method(input_data, rmlRule);

  return result;
}

module.exports = {
  mapData: mapData,
};
