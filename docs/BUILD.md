# 记录 react+ts 环境搭建过程

## 项目初始化配置

```js
npm init -y
```

## 项目代码规范

### 1. editorconfig

vscode 快速生成 editorconfig 配置
commond+shift+p > Generate .editorconfig

```json
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = false
```

### 2. prettier

#### 安装

```js
pnpm i prettier -D
```

#### 配置

新建 `.prettierrc` 文件

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "endOfLine": "lf",
  "printWidth": 120,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

查看更多 prettier 配置 [戳这里](https://prettier.io/playground/)

### 3. .vscode 配置文件 使得当前工作空间的配置一致

touch .vscode/settings.json

```json
{
  // 指定哪些文件不参与搜索
  "search.exclude": {
    "**/node_modules": true,
    "dist": true
  },
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 4. ESLint

安装

```bash
pnpm i eslint -D
```

安装成功后，执行以下命令：

```bash
npx eslint --init
```

进行选择相应的 eslint 配置

- How would you like to use ESLint?

果断选择第三条 `To check syntax, find problems, and enforce code style` ，检查语法、检测问题并强制代码风格。

- What type of modules does your project use?

项目非配置代码都是采用的 ES6 模块系统导入导出，选择 `JavaScript modules (import/export) `。

- Which framework does your project use?

显而易见，选择 `React` 。

- Does your project use TypeScript?

果断用上 `Typescript` 啊，还记得我们文章的标题吗？选择 Yes 后生成的 eslint 配置文件会给我们默认配上支持 Typescript 的 parse 以及插件 plugins 等。

- Where does your code run?

`Browser` 和 `Node` 环境都选上，之后可能会编写一些 node 代码。

- How would you like to define a style for your project?

选择 `Use a popular style guide` ，即使用社区已经制定好的代码风格，我们去遵守就行。

- Which style guide do you want to follow?

选择 `Airbnb` 风格，都是社区总结出来的最佳实践。

- What format do you want your config file to be in?

选择 `JavaScript` ，即生成的配置文件是 js 文件，配置更加灵活。

- Would you like to install them now with npm?

eslint-plugin-react@^7.28.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 @typescript-eslint/parser@latest

我选择了 `NO` ,因为想尝试使用 `pnpm`

所以使用 pnpm 重新安装了这些依赖

```bash
pnpm i eslint-plugin-react@^7.28.0 eslint-config-airbnb@latest eslint-config-airbnb@latest eslint@^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 @typescript-eslint/parser@latest -D
```

安装完提示缺少 ts 依赖，安装一下 ts

```bash
pnpm i typescript -D
```

这时候项目根目录已经建好了 `.eslintrc.js` ,配置可以见 [这里](https://eslint.bootcss.com/docs/user-guide/configuring)

修改 `.eslintrc.js` 文件

- 开启 react hooks 检查

extends 中添加 `airbnb/hooks`

- 开启 ts 语法推荐规则

在 extends 中添加 `plugin:@typescript-eslint/recommended`
需要安装 `pnpm i @typescript-eslint/eslint-plugin -D`

安装两个比较推荐的 eslint 插件

- eslint-plugin-promise
- eslint-plugin-unicorn

在 extends 中添加 `plugin:unicorn/recommended, plugin:promise/recommended,`

在 `.vscode > settings.json` 文件中添加

```json
"editor.formatOnSave": true,
"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
},
```

完整 `.eslintrc.js` 文件

```js
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/function-component-definition': [
      OFF,
      {
        namedComponents: 'function-declaration',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
    },
  },
};
```

### 5. StyleLint

[StyleLint 官网](https://stylelint.io/user-guide/get-started/)

安装两个基础包

```bash
pnpm i stylelint stylelint-config-standard stylelint-config-prettier  -D
```

新建 `.stylelintrc` 文件，添加以下配置

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier"],
  "ignoreFiles": ["node_modules/**/*"]
}
```

在 `.vscode > settings.json` 文件中添加

```bash
// 使用 stylelint 自身校验
"css.validate": false,
"less.validate": false,
"scss.validate": false,

"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.fixAll.stylelint": true
}
```

### 6. lint 命令

```json
"lint": "pnpm run lint-eslint && pnpm run lint-stylelint",
"lint-eslint": "eslint -c .eslintrc.js --ext .ts,.tsx,.js src",
"lint-stylelint": "stylelint --config .stylelintrc.js src/**/*.{less,css,scss}",
```

### 7. lint-staged

[husky](https://github.com/typicode/husky)

安装

```bash
pnpm install husky lint-staged -D
```

编辑 `package.json`

```json
"scripts": {
  "prepare": "husky install",
  "lint-staged": "lint-staged"
},
"lint-staged": {
  "*.{ts,tsx,js}": [
    "eslint --config .eslintrc.js"
  ],
  "*.{css,less,scss}": [
    "stylelint --config .stylelintrc.js"
  ],
  "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
    "prettier --write"
  ]
}
```

然后运行 `npm run prepare`, 根目录就会生成一个 `.husky` 文件夹

然后添加 hook

```bash
npx husky add .husky/pre-commit "pnpm run lint-staged"
```

### 8. commitlint + changelog

[commitlint](https://github.com/conventional-changelog/commitlint)

安装

```bash
pnpm install @commitlint/cli @commitlint/config-conventional -D
```

生成 commitlint 配置文件

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

add husky hooks

```bash
npx husky add .husky/commit-msg "npx --no -- commitlint --edit "
```

接下来配置生成 changelog

安装

```bash
pnpm install conventional-changelog-cli -D
```

编辑 `package.json`

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```
