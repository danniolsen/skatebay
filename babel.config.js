module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"]
  };
};

// controle .env
module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "module:react-native-dotenv"
  ]
};
