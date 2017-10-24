module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    // 'semistandard'
  ],
  env: {
    'browser': true
  },
  rules: {
    "comma-dangle": [2, "only-multiline"],
    "no-console": 0,
    "no-extra-boolean-cast": 0
  },
  globals: {
    "_": false,
    "moment": false,
    "Set": false,
    "Map": false,
    "md5": false
  }
};
