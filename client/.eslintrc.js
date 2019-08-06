module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    $nuxt: true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  // add your custom rules here
  "rules": {
    "no-path-concat": "off",
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
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/html-quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "always"
    }]
  }
}
