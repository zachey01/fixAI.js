# FixAI 🚀

FixAI is a lightweight NPM library that automatically fixes code errors by leveraging the power of ChatGPT-4, completely free and without the need for an API token.

[![NPM Downloads](https://img.shields.io/npm/dt/fixai?color=brightgreen)](https://www.npmjs.com/package/fixai)

https://github.com/user-attachments/assets/8fc77ec4-64ad-4286-a240-d6a34d347db3

## 📋 Table of Contents

- [FixAI 🚀](#fixai-)
  - [📋 Table of Contents](#-table-of-contents)
  - [Features ✨](#features-)
  - [Installation 💻](#installation-)
    - [📦 NPM](#-npm)
    - [📦 Yarn](#-yarn)
    - [📦 Bun](#-bun)
  - [Usage 🛠️](#usage-️)
  - [How it works 🔍](#how-it-works-)
  - [License 📄](#license-)

## Features ✨

- **No API key required**: Get started immediately without needing to set up an OpenAI token.
- **Free access to GPT-4**: Utilize OpenAI's powerful GPT-4 model for code correction.
- **Simple setup**: Just add a single line to your project, and you're ready to start fixing errors.

## Installation 💻

You can install FixAI using your favorite package manager:

### 📦 NPM

```bash
npm install fixai
```

### 📦 Yarn

```bash
yarn add fixai
```

### 📦 Bun

```bash
bun add fixai
```

## Usage 🛠️

Add FixAI to your project by requiring it:

```javascript
require("fixai");

const a = JSON.parse("{invalidJson}");
console.log(a);
```

In this example, FixAI will analyze the provided code, detect the issue, and correct it.

## How it works 🔍

FixAI sends your code to ChatGPT-4 for analysis and returns a corrected version. No API key is needed, so there's no complex setup or additional costs.

## License 📄

This project is licensed under the MIT License.
