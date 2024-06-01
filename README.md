# flex-rml-node

**flex-rml-node** is a Node.js compatible version of FlexRML built with node-gyp. This implementation is based on the [ESP32 version of FlexRML](https://github.com/wintechis/flex-rml-esp32/tree/main), meaning all data is mapped in memory and performed in a single thread. The package is only tested on Ubuntu 22.04 using node v20.10.0. If you use Windows try using flex-rml-node in WSL.

## How to Use

### Loading the Module

```javascript
const flexrml = require("flexrml-node");
```

### Loading the Module
To map data using flex-rml-node, call the map function:
```javascript
const result = flexrml.map(input, rmlRule);
```
- `rmlRule`: The definition of the RML rule as a string.
- `input`: An object where the dataset name is the key, and the input data to map is the value in string format. Following the convention introduced by [Dasoulas et al.](https://lirias.kuleuven.be/retrieve/718052). Currently, only CSV data is supported as input for flex-rml-node.

### Example
For a detailed example, check out the [example.js](https://github.com/wintechis/flex-rml-node/blob/main/example.js).