![ExRx Net Crawler Feature Graphics](https://raw.githubusercontent.com/johnnymillergh/MaterialLibrary/master/exrx-net-crawler/exrx-net-crawler-social-image.png)

[![GitHub release](https://img.shields.io/github/release/johnnymillergh/exrx-net-crawler.svg)](https://github.com/johnnymillergh/exrx-net-crawler/releases)
[![Build Status](https://travis-ci.com/johnnymillergh/exrx-net-crawler.svg?branch=master)](https://travis-ci.com/johnnymillergh/typescript-playground)
[![GitHub issues](https://img.shields.io/github/issues/johnnymillergh/exrx-net-crawler)](https://github.com/johnnymillergh/exrx-net-crawler/issues)
[![GitHub forks](https://img.shields.io/github/forks/johnnymillergh/exrx-net-crawler)](https://github.com/johnnymillergh/exrx-net-crawler/network)
[![GitHub stars](https://img.shields.io/github/stars/johnnymillergh/exrx-net-crawler)](https://github.com/johnnymillergh/exrx-net-crawler/stargazers)
[![GitHub license](https://img.shields.io/github/license/johnnymillergh/exrx-net-crawler)](https://github.com/johnnymillergh/exrx-net-crawler/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/johnnymillergh/exrx-net-crawler?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fjohnnymillergh%2Fexrx-net-crawler)

# ExRx.net Crawler

**ExRx.net Crawler** is a Vuetify tutorial project based on TypeScript.

[Official Docker Image](https://hub.docker.com/r/ijohnnymiller/exrx-net-crawler-prod)

## Features

Here is the highlights of **ExRx.net Crawler**:

1. Parse DOM, marge DOM nodes.
2. Axios, support CORS.
3. Communicate with back-end server.
4. Based on the most modern and latest [**Type**Script](https://github.com/microsoft/TypeScript) - [![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=3.7.3&x2=0)](https://www.npmjs.com/package/typescript)
5. Material components demo.
6. Docker support.
7. Multi-environment support, multi-lingual (internationalisation).
8. NGINX Gzip support.
9. Support `Dark` / `Light` color scheme. Self-adaptive color scheme change.
10. Lazy router.
11. Beatified noscript content.

## Usage

### Project Setup

Recommended IDE is the latest version JetBrains WebStorm.

1. Clone or download this project.

   ```shell
   $ git clone https://github.com/johnnymillergh/exrx-net-crawler.git
   ```

2. Project setup.

   ```shell
   npm install
   ```

### Compiles and Hot-reloads for Development

   ```shell
npm run serve
   ```

### Compiles and Minifies for Production

```shell
npm run build
```

### Run Your Unit Tests

```sh
npm run test:unit
```

### Lints and fixes files

```shell
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker Integration

Docker deployment can defer by environment. Here is the list of environments:

| #    | Environment Name   | Environment Alias Name | Description |
| ---- | ------------------ | ---------------------- | ----------- |
| 1    | development_docker | dev_dkr                |             |
| 2    | test               | test                   |             |
| 3    | stage              | stage                  |             |
| 4    | production         | prod                   |             |

### The Procedures of Docker Deployment

1. Compile and minify source (can be deferred by environment, if it’s `development_docker`, then the command could be `npm run build:dev_dkr`)

   ```shell
   npm run build
   ```

2. Build Docker image and run by Docker Compose. Available Docker Compose:

   - development_docker
   - test
   - stage
   - production

## Maintainers

[@johnnymillergh](https://github.com/johnnymillergh).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/johnnymillergh/typescript-playground/issues/new).

### Contributors

This project exists thanks to all the people who contribute. 

- Johnny Miller [[@johnnymillergh](https://github.com/johnnymillergh)]
- …


### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](Become a sponsor)]

## License

[Apache License](https://github.com/johnnymillergh/typescript-playground/blob/master/LICENSE) © Johnny Miller

2020 - Present



