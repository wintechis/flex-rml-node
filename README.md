# FlexRML-node

**FlexRML-node** is a Node.js compatible version of FlexRML compiled to WebAssembly. This implementation is based on the [ESP32 version of FlexRML](https://github.com/wintechis/flex-rml-esp32/tree/main), meaning all data is mapped in memory and performed in a single thread. The package is tested on Ubuntu 24.04 using node v22.3.0 and Windows 10 using node v16.13.2.

## How to Use

### Loading the Module

```javascript
const flexrml = require("flexrml-node");
```

### Map RDF data with FlexRML
To map data using flexrml-node, call the mapData function:
```javascript
const result = await flexrml.mapData(input, rmlRule);
```
- `rmlRule`: The definition of the RML rule as string.
- `input`: An object where the dataset name is the key, and the input data to map is the value in string format. Following the convention introduced by [Dasoulas et al.](https://lirias.kuleuven.be/retrieve/718052) for mapping in memeory datasources. Currently, only CSV data is supported as input for flexrml-node.

### Example
For an example, check out the [example.js](https://github.com/wintechis/flex-rml-node/blob/main/example.js).

### Building form source
flexrml-node can be built from source using [emscripten](https://emscripten.org/docs/getting_started/downloads.html). This version is compiled with emcc version 3.1.61.

To compile make sure your are in the flex-rml-node directory and execute this command:
```
emcc src/FlexRML.cpp src/base64.cpp src/byte_source.cpp src/conversion.cpp src/csv_reader.cpp src/custom_io.cpp src/env.cpp src/flexinput.cpp src/n3.cpp src/node.cpp src/rdf_parser.cpp src/rdf_vector_helper.cpp src/reader.cpp src/rml_extractor.cpp src/string.cpp src/string_helper.cpp src/system.cpp src/termtype_helper.cpp src/uri.cpp src/writer.cpp -o flex.js -s WASM=1 -s MODULARIZE=1 -s EXPORT_NAME="createModule" -s ALLOW_MEMORY_GROWTH=1 -s ENVIRONMENT=node -O3 --bind
```

The file `index.js` contains a wrapper for the WebAssembly code and handles data transformations.

