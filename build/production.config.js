const CopyPlugin = require("copy-webpack-plugin");

const distName = __dirname + '\\malboro'

const config = {
  mode: 'production'
}

const client = Object.assign({}, config, {
  name: 'client',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: distName + '/dist/',
  }
});
const server = Object.assign({}, config, {
  entry: './src/server.js',
  mode: 'production',
  output: {
    filename: 'server.js',
    path: distName + '/dist/',
  },
});

const common = Object.assign({}, config, {
  name: "common",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "fxmanifest.lua", to:  distName },
        { from: "src/**/*", to:  distName },
        { from: "package.json", to:  distName },
      ],
    })]
});

module.exports = [
  client, server, common
];
