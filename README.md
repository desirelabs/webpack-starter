# webpack-starter
Starter webpack project, including support for the most common used frontend dependencies. See below.
This project is under active development. Be careful as it might change often during this period.

### Build for React available, see below.

## What's included ?
* Support for ES2015
* Support Sass/Scss
* Production minifications for css and js files
* Live reload server
* FlowType checking
* Jest & Enzyme testing

## Installation
With npm :
```
npm install
```
or with yarn :
```
yarn install
```

## Starting environments
### Development server with live reload :
```
npm run start
```
or
```
yarn start
```
### Development build :
```
npm run watch
```
or
```
yarn watch
```
### Production build :
```
npm run build
```
or
```
yarn build
```

## Specifications
All scripts must remain in the `assets` folder, including `css/app.scss`, `js/app.js` and `index.html` file and folders.

`yarn start` or `npm run start` commands will automatically launch a local server on port 9000, then any modification to files included in `assets` will be compiled to the dist folder.

## Other builds
### React
A build for React is available under the branch "react" : https://github.com/desirelabs/webpack-starter/tree/react