# demo-ui

基于vue3+TS的组件库。

## 安装使用

- 获取项目代码（https or ssh）

```bash
git clone https://github.com/xielinchang/demo-ui.git

git clone git@github.com:xielinchang/demo-ui.git
```


- 安装依赖

```bash
yarn install
```

### Developer

- 组件库调试

```bash
yarn dev
```

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 新增功能
  - `fix` 修复缺陷
  - `docs` 文档变更
  - `style` 代码格式
  - `refactor` 代码重构
  - `perf` 性能优化
  - `test` 添加疏漏测试或已有测试改动
  - `build` 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)
  - `ci` 修改 CI 配置、脚本
  - `revert` 回滚 commit
  - `chore` 对构建过程或辅助工具和库的更改 (不影响源文件)
  - `wip` 正在开发中
  - `types` 类型定义文件修改

- 或使用指令提交

```bash
npm run cz
```

### 规范相关

- [EsLint](https://eslint.org/) - js 语法检测
- [CommitLint](https://commitlint.js.org/#/) - git commit 提交规范检测


## 目录

```
demo-ui
├─ .eslintrc.js
├─ .gitignore
├─ .husky
├─ commitlint.config.js
├─ docs                         # vitepress文档目录
│  ├─ components
│  │  ├─ .vitepress
│  │  ├─ index.md
│  │  └─ start.md
│  ├─ package.json
│  └─ yarn.lock
├─ examples                     # 公共组件目录
│  ├─ App.vue
│  ├─ assets
│  │  ├─ scss
│  │  │  └─ global.scss
│  │  └─ vue.svg
│  ├─ components                # 组件存放目录
│  │  ├─ iButton.vue
│  │  └─ index.ts
│  ├─ main.ts
│  ├─ style.css
│  └─ vite-env.d.ts
├─ index.html
├─ package-lock.json
├─ package.json
├─ packages                      # 打包组件目录
│  └─ Button.vue
├─ prettier.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ yarn.lock

```

