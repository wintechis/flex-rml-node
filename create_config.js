const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const cppFiles = fs.readdirSync(srcDir).filter(file => file.endsWith('.cpp'));

const bindingGyp = {
  targets: [
    {
      target_name: "nodeFlex",
      sources: cppFiles.map(file => path.join('src', file)),
      cflags: ["-O3", "-fexceptions"],
      cflags_cc: ["-O3", "-fexceptions"],
      ldflags: ["-O3", "-fexceptions"]
    }
  ]
};

fs.writeFileSync('binding.gyp', JSON.stringify(bindingGyp, null, 2));