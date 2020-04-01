module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    jest: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "object-curly-newline": "off",
    "react/jsx-wrap-multilines": "off",
    quotes: [2, "double", { avoidEscape: true }]
  },
  globals: {
    fetch: false
  }
};
