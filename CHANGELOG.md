# 1.0.0 (2020-01-30)


### Bug Fixes

* **$Exercise:** correct exercise URL ([d10f297](https://github.com/johnnymillergh/exrx-net-crawler/commit/d10f2978ac42d643402b6d341e97326d65bd63e2))


### Build System

* **$exrx-net-crawler:** initial project ([8afa70c](https://github.com/johnnymillergh/exrx-net-crawler/commit/8afa70c3c033978699f412f48288becd0df427c7))


### Features

* **$Axios:** support multipart file upload ([1475feb](https://github.com/johnnymillergh/exrx-net-crawler/commit/1475feb16a438d1e2f1b54ab8c147315b3f6d69a))
* **$Exercise:** add exercise component ([0d8bfbe](https://github.com/johnnymillergh/exrx-net-crawler/commit/0d8bfbea39638ee65962e60d215d8042ddafc130))
* **$Exercise:** parse exercise's classification ([ce80fa9](https://github.com/johnnymillergh/exrx-net-crawler/commit/ce80fa92054caa5db47e25a66db4ddf76a63c7e4))
* **$Exercise:** parse exercise's related muscles ([995674e](https://github.com/johnnymillergh/exrx-net-crawler/commit/995674e39d0750500aa47826f143ca9cecbf9717))
* **$Exercise:** parse specific exercise ([6178b2a](https://github.com/johnnymillergh/exrx-net-crawler/commit/6178b2a0469b5d48960fe8a8ace939ba58a73cc4))
* **$Exercise, BodyPart:** parse exercise link which is sorted by body part ([65c5b3f](https://github.com/johnnymillergh/exrx-net-crawler/commit/65c5b3f0d1da5e81779e28ccbf24db3033c18eab))
* **$ExerciseClassification:** save exercise classification ([3bfee01](https://github.com/johnnymillergh/exrx-net-crawler/commit/3bfee0149c8e7c5cf93bbe287ab0475c128ad332))
* **$HelloWorld:** add social image ([5a8e7fa](https://github.com/johnnymillergh/exrx-net-crawler/commit/5a8e7facadd39c74258842b970858c81079213e9))
* **$Muscle:** get muscle data ([e73b7ac](https://github.com/johnnymillergh/exrx-net-crawler/commit/e73b7ac0ffcf14d2085f26a2c94252882336f5b4))
* **$Muscle:** parse muscle's link ([0db4f7f](https://github.com/johnnymillergh/exrx-net-crawler/commit/0db4f7f97fcf46be3cce85d605f9ebef985de0ba))
* **$Muscle:** restore muscle path to URL ([fcc4e60](https://github.com/johnnymillergh/exrx-net-crawler/commit/fcc4e60dc29e375cb0ff84851b4939b0f43ea690))
* **$Muscle:** save muscle info ([3b21aa5](https://github.com/johnnymillergh/exrx-net-crawler/commit/3b21aa5b79c840042d645e4653cc63659b7f401e))
* **$Muscle:** send request to update muscle details ([2c2f8a7](https://github.com/johnnymillergh/exrx-net-crawler/commit/2c2f8a7f6cf85e54f3472ea7a4eaa7c5a118270e))
* **$UI:** enhance UI - use MD style ([04516a4](https://github.com/johnnymillergh/exrx-net-crawler/commit/04516a4456fa2abe7c49fe2ec3c8bf46a90426cd))


### Performance Improvements

* **$Axios:** cancel timeout for inter communication ([662e6ac](https://github.com/johnnymillergh/exrx-net-crawler/commit/662e6ac58e9cd52eef3bcf0a4a95d2d2dce74208))
* **$Axios:** refine function `restorePathToUrl` ([4f4b68d](https://github.com/johnnymillergh/exrx-net-crawler/commit/4f4b68d776793eada628430dd2debe3eab633c3a))
* **$Axios:** support uploading multiple files ([83edc68](https://github.com/johnnymillergh/exrx-net-crawler/commit/83edc68e8cd9cc285ef270a6e0175a40ea42c0a8))
* **$Axios, FileUpload:** enhance Axios `GET` request ([bb46329](https://github.com/johnnymillergh/exrx-net-crawler/commit/bb463294cad23ac9b344010bd3ee81fdf66558be))
* **$Exercise:** prevent from generating empty exercise's classification list ([290579e](https://github.com/johnnymillergh/exrx-net-crawler/commit/290579e4e9791c7ccf5d01c229fb395ee6891c80))
* **$Exercise:** refine parsing exercise classification ([2809347](https://github.com/johnnymillergh/exrx-net-crawler/commit/28093470204a85836779bbb861594f197dd45ce6))
* **$Exercise:** refine regular expression of parsing exercise classification ([e473d31](https://github.com/johnnymillergh/exrx-net-crawler/commit/e473d31dea8893ac92fb821da082fd74d6638d45))
* **$exrx-net-crawler:** devide codes into components ([fbdd899](https://github.com/johnnymillergh/exrx-net-crawler/commit/fbdd899f7ed6787f2fec47891b03c4cfc96d4977))
* **$RegExp:** refine regular expression ([cd1d0e1](https://github.com/johnnymillergh/exrx-net-crawler/commit/cd1d0e1a91eadabce93a815ce5c5fd85599c489a))


### BREAKING CHANGES

* **$exrx-net-crawler:** abstract components
* **$Axios, FileUpload:** Support respond ArrayBuffer (byte array) as HTTP
response.
* **$exrx-net-crawler:** implemented infra web scraping



# [1.4.0](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v1.3.1...v1.4.0) (2020-01-07)


### Performance Improvements

* **$Axios:** avoid sending same request at the same time ([c7eb3b7](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/c7eb3b7d5388aaa0b8fea4fcb6cd129c87fb6b5c))



## [1.3.1](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v1.3.0...v1.3.1) (2020-01-03)


### Features

* **$App:** use YouTube-like layout ([dd61af0](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/dd61af02e5b42ea1494558a4f4f2a616b433a1c6))
* **$Demo:** change ripple effect ([2a221d5](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/2a221d553c225eb82453c812090dbc9e47ecc8cc))
* **$Icon:** add dependency `@mdi/js` ([2d48f33](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/2d48f33fa8d6bc4894808e625b2c46ea97a68f89))
* **$Toast:** new Vue plugin `Vuetify Toast` ([faf96f0](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/faf96f047a9d0a74baa0da86a0f16fd93ad724a9))
* **$Validation:** add field validation ([9170df2](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/9170df2bf10e5be044b4744d0ce793e2eee6df12))


### Performance Improvements

* **$ClassValidator:** integrate Class Validator ([7a44a3f](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/7a44a3fd6c8f056597472f97ed0bfc4c3866e0d4))
* **$ESLint:** update ESLint rule `yoda` ([1473f79](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/1473f797bde18668d8511429b627b24c99dc8604))
* **$package.json:** add dependencies axios, class-validator, mock.js ([9f98264](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/9f9826484cbc6ee8e1093243f4a7087e1240c20c))
* **$package.json:** integrate axios-mock-adapter ([f890d6f](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/f890d6f69f4926c8acec33d73e18a9ba1c7125c0))
* **$package.json:** upgrade dependencies: vuetify@2.2.1, @typescript-eslint/eslint-plugin@2.14.0, @typescript-eslint/parser@2.14.0, @vue/cli-plugin-babel@4.1.2, @vue/cli-plugin-eslint@4.1.2, @vue/cli-plugin-router@4.1.2, @vue/cli-plugin-typescript@4.1.2, @vue/cli-plugin-unit-jest@4.1.2, @vue/cli-plugin-vuex@4.1.2, @vue/cli-service@4.1.2, eslint-plugin-vue@6.1.2, vue-cli-plugin-vuetify@2.0.3 ([4122050](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/41220506241848558edd7afd2ac2fcdc1eb98427))


### BREAKING CHANGES

* **$Icon:** support @mdi/js
* **$App:** use YouTube-like layout



# [1.3.0](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v1.2.0...v1.3.0) (2019-12-31)


### Features

* **$favicon:** update favicon ([4b2b966](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/4b2b966eb896fbc995390ba4219bebb3a1b0a049))


### Performance Improvements

* **$NGINX:** support persistence NGINX log ([59092d0](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/59092d0001c81d2ffe4d3674c99f427e058519f2))


### BREAKING CHANGES

* **$favicon:** Brand new favicon.
* **$NGINX:** Support persistence NGINX log, storage NGINX log on
local machine.



# [1.2.0](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v1.1.0...v1.2.0) (2019-12-31)


### Features

* **$Debounce:** add `Debounced Click` directive ([91d7964](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/91d7964fbc6971843263b5ae21c25856950decdb))
* **$Demo:** add ripple effect ([484ef04](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/484ef048ca81273b49a92c20230d01f91e494cae))
* **$i18n:** internationalization i18n support ([f2c0c8e](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/f2c0c8e0413ffe0a2a30f5f3e8e0334e4f3e8c86))


### Performance Improvements

* **$Theme:** abstract codes of color scheme ([098378e](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/098378e62360fb29f2d11453cf51a46496b66caa))


### BREAKING CHANGES

* **$i18n:** internationalization i18n support.
* **$Debounce:** debounced click support.



# [1.1.0](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v1.0.0...v1.1.0) (2019-12-30)


### Features

* **$Directive:** add customized directive `Throttled Click` ([fdd17cf](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/fdd17cfaa375126fa3344b7c3af0421ec88704b5))
* **$Theme:** adaptive color scheme support ([7da3520](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/7da3520b436bd043c2271201976487fd56ab9145))
* **$Theme:** add self-adaptive color scheme ([ffe12e6](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/ffe12e6a4dff2f0e9055fdf607d90f642c3a148b))


### Performance Improvements

* **$ESLint:** add new rule for ESLint ([abcb400](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/abcb4007f70400c20151b1e11c7a20ab92899b01))
* **$package.json:** add dependencies ([0fb370e](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/0fb370e679ca699f639f32dda16487b923be91e2))


### BREAKING CHANGES

* **$Theme:** adaptive color scheme support.
* **$Theme:** self-adaptive color scheme acording user's computer
setting (dark or light)
* **$Directive:** Throttled Click is a customized directive which can prevent user mouse input from triggering for several times in specific
duration.



# [1.0.0](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v0.1.2...v1.0.0) (2019-12-30)


### Features

* **$App:** add AppUtil for getting package.json information ([566e956](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/566e95687c7db1283473806653c90dba6c8d76f3))


### BREAKING CHANGES

* **$App:** add AppUtil for getting package.json information



## [0.1.2](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v0.1.1...v0.1.2) (2019-12-30)


### Documentation

* **$README:** update README.md ([1af96fb](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/1af96fbfc29be5aa9f7cde699fa40a3d5a31548a))


### BREAKING CHANGES

* **$README:** update README.md



## [0.1.1](https://github.com/johnnymillergh/vuetify-typescript-playground/compare/v0.1.0...v0.1.1) (2019-12-27)


### Bug Fixes

* **$Travis:** correct NPM command ([c20c7d2](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/c20c7d25194056a73da116489cfb86dd041925a5))
* **$VueConfig:** fix ESLint problem ([02b2281](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/02b2281553a0557fb7b7931382c952380a6c65e0))


### Features

* **$Demo:** create Vuetify demo page ([80afc80](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/80afc804c594db618c8417820916f7d44658c48e))
* **$Docker:** integrate Docker ([24e43db](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/24e43db4a9e8ea0275242638248e892bf6559964))
* **$RouterView:** add router changing animation ([340f912](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/340f9122912fbdc0cd52c9f3a8104e41ed50d0c3))


### Performance Improvements

* **$package.json:** update dependencies ([453198f](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/453198f85790205ff9c094945437a5d9a67efbc0))



# 0.1.0 (2019-12-27)


### Bug Fixes

* **$Travis:** correct command ([480b1db](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/480b1db93f11d9e0c1815cd13a5dfa2ae31ac322))
* **$Travis:** remove command ([1c542cf](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/1c542cf2dedadc69ba7c9cd55519bc38612b3771))


### Features

* **$ESLint:** add more ESLint for HTML ([733f4f5](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/733f4f52d51b37998b1fa7d172bfb80d9aa9af1a))
* **$ESLint:** improve ESLint rules ([5aba6a4](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/5aba6a412f03d714f70186e8bc4c6cb854d4d092))
* **$HelloWorld:** use prop to pass data ([2f989e5](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/2f989e51887faf9b0d1ce82123efb42b6d40f30c))
* **$Vuetify:** integrate Vuetify ([ba1ee28](https://github.com/johnnymillergh/vuetify-typescript-playground/commit/ba1ee2891c8efa3cf4e5356b891823d60eeb581a))


### BREAKING CHANGES

* **$Vuetify:** Vuetify integration



