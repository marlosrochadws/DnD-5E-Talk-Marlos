# Refactory

A basic static site generator using eleventy.

## Development Notes

* Need to solve headless CMS integration for Jamstack

## Getting started

1. Install the newest stable version of node.js
  1a. `npm cache clean -f`
  1b. `npm install -g n`
  1c. `sudo n stable`
2. Install the latest stable version of NPM
  2a. `npm install -g npm@latest`
3. Clone or fork this repo: `git clone org-83410388@github.com:gdo-iprospect-usa/refactory.git`
4. `cd` into the project directory and run `npm install`
  4a. If you see error for babel-loader, run `npm install -D babel-loader`

## Running and serving a dev build

```sh
npm run dev
```

Browse to [http://localhost:8080](http://localhost:8080).

## Running and serving a prod build

```sh
npm run prod
npm run serve:prod
```

Browse to [http://localhost:5000](http://localhost:5000).

## Technologies used

* [Eleventy](https://www.11ty.dev/) for static site generation
* [Nunjucks](https://mozilla.github.io/nunjucks/) which is the default templating engine for Eleventy
* [Sass](https://sass-lang.com/) for writing CSS
* [TailwindCSS] (https://tailwindcss.com/) for atomic classes in HTML
* [Babel](https://babeljs.io/) for transpiling and polyfilling JavaScript
* [Autoprefixer](https://github.com/postcss/autoprefixer) for vendor prefixing CSS
* [Webpack](https://webpack.js.org/) for compiling the Sass and JavaScript assets
* [ESLint](https://eslint.org/) and [Airbnb's base configuration](https://www.npmjs.com/package/eslint-config-airbnb-base) for linting

## Project structure

```
src/
  _data/
    Eleventy data files
  _includes/
    Code partials
  _layouts/
    Base page layouts
  _pages/
    Each individual page template
  assets/
    css/
      index.scss
      All other scss files
    js/
      index.js
      All other js files
  images/
    All images used
Configuration and build files
```

Files in `assets` will be handled by webpack, Eleventy will transform all of the directories with a leading `_`, and will copy across any `images`.

Eleventy’s output will be to a `dist` directory at the root level.