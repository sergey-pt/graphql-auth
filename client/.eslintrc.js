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
    "prettier",
    "prettier/vue"
  ],
  "plugins": [
    "prettier"
  ],
  // add your custom rules here
  "rules": {
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
    "vue/html-quotes": [
      "error",
      "single"
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
