## [1.0.2](https://github.com/johnnymillergh/exrx-net-crawler/compare/v1.0.1...v1.0.2) (2020-01-30)



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



