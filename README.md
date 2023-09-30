# babel-plugin-tsconfig-alias-to-relative

## Overview
[![npm version](https://badgen.net/npm/v/babel-plugin-tsconfig-alias-to-relative)](https://www.npmjs.com/package/babel-plugin-tsconfig-alias-to-relative)
[![npm version](https://badgen.net/npm/dw/babel-plugin-tsconfig-alias-to-relative)](https://www.npmjs.com/package/babel-plugin-tsconfig-alias-to-relative)

This Babel plugin is designed to automatically resolve TypeScript's `tsconfig.json` path aliases using relative paths. It simplifies the development process by allowing you to use aliases in your import statements without worrying about the file's location.

| dependency                          | weekly downloads                                         |
| ----------------------------------- | -------------------------------------------------------- |
| [json-to-js-obj](https://www.npmjs.com/package/json-to-js-obj) | [![npm version](https://badgen.net/npm/dw/json-to-js-obj)](https://www.npmjs.com/package/json-to-js-obj) |

## Installation

To install the babel-plugin-tsconfig-alias-to-relative, use your preferred package manager:

```bash
npm install -D babel-plugin-tsconfig-alias-to-relative
```
**Or**

```bash
yarn add babel-plugin-tsconfig-alias-to-relative --dev
```
## Note:
```
This plugin just only resolve src directory files only. I mean you needed to use conventional rules.
````
## Features
- Dynamically resolve path to `relative path` style.

## Usage
you must to be specified in `babel config` file
```js
{
  "presets": [
    // ...
    "@babel/preset-typescript",
    // ...
  ],
  "plugins": [
    // add this to your babel config file in `plugins`
    // 👇👇👇
    "tsconfig-alias-to-relative"
    // 👆👆👆
    // ...
  ]
}
```

## Contact

If you have any questions, feedback, or need assistance with this package, feel free to reach out:

- Author: Safin Ali
- Email: safin.ali.7205@gmail.com
- GitHub: [github.com/Safin-Ali](https://github.com/Safin-Ali)
- Website: [https://safin-ali.vercel.app](https://safin-ali.vercel.app/)
