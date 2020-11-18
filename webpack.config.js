const path = require("path");
module.exports = {
  entry: [
    "./js/util.js",
    "./js/load.js",
    "./js/upload.js",
    "./js/upload-messages.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/move.js",
    "./js/map.js",
    "./js/form.js",
    "./js/debounce.js",
    "./js/pins-filter.js",
    "./js/main.js",
    "./js/avatar.js",
    "./js/offer-photos.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false

};
