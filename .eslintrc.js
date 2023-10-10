module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  plugins: ["@typescript-eslint", "smells", "filenames", "import"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".js", ".jsx", ".json"]
      }
    },
    "import/extensions": [".js", ".jsx", ".mjs", ".ts", ".tsx"]
  },
  extends: [
    "plugin:vue/base",
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended",
    "plugin:vue/recommended",

    "@vue/typescript",

    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  rules: {
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "import/no-duplicates": "off",
    "vue/no-v-html": "off",
    "vue/require-prop-types": "off",
    "vue/require-default-prop": "off",
    "vue/this-in-template": "error",
    "vue/no-restricted-syntax": "error",
    "vue/v-on-function-call": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    "filenames/match-regex": "off",
    "no-console": process.env.NODE_ENV === "development" ? "warn" : "error",
    "no-debugger": process.env.NODE_ENV === "development" ? "warn" : "error",
    "no-alert": "off",
    "no-var": "error",
    "quotes": [1, "double"],
    "ordered-imports": 0,
    "object-curly-spacing": [1, "always"],
    "object-literal-sort-keys": 0,
    "no-consecutive-blank-lines": 0,
    "no-trailing-spaces": 1,
    "semi": [1, "always"],
    "eol-last": [1, "always"],
    "comma-dangle": [1, "never"],
    "interface-name": 0,
    "smells/no-switch": "error",
    "smells/no-complex-switch-case": "error",
    "smells/no-setinterval": "error",
    "smells/no-this-assign": "off",
    "no-unexpected-multiline": "error",
    "no-return-assign": ["error", "always"],
    "no-useless-escape": "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
