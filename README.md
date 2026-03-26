# personalBlog

A static site base on [dumi](https://d.umijs.org).

## Project initialization

```bash
# 1) install dependencies (will run `prepare` automatically)
pnpm install

# 2) start local development server
pnpm start

# 3) build static docs into dist/
pnpm run docs:build

# 4) deploy dist/ to GitHub Pages
pnpm run deploy
```

> `prepare` in `package.json` runs `husky install && dumi setup`, so the `.dumi/` runtime files and git hooks are prepared during installation.

## Available tools

### Package scripts

- `pnpm start`: alias of `pnpm run dev`
- `pnpm run dev`: start dumi development server
- `pnpm run docs:build`: build production static site to `dist/`
- `pnpm run deploy`: publish `dist/` using `gh-pages`
- `pnpm run prepare`: install husky hooks and run `dumi setup`

### Core toolchain

- **dumi**: docs site framework and builder
- **dumi-theme-antd-style**: visual theme extension
- **gh-pages**: deployment helper for GitHub Pages
- **husky**: git hooks manager
- **commitlint**: commit message linting
- **prettier**: formatting

## LICENSE

MIT
