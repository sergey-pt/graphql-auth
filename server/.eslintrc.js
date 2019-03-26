module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": "module"
  },
  "rules": {
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-unpublished-require": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "minProperties": 1,
        "multiline": true
      },
      "ObjectPattern": { "multiline": true },
      "ImportDeclaration": "always",
      "ExportDeclaration": "always"
    }],
    "object-property-newline": [
      "error", {
        "allowAllPropertiesOnSameLine": false
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ]
  }
};
