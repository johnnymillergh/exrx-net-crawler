# [1.1.0](https://github.com/johnnymillergh/exrx-net-crawler/compare/v1.0.2...v1.1.0) (2020-02-11)


### Bug Fixes

* **$Axios:** check nullity before validation ([ac6a2a6](https://github.com/johnnymillergh/exrx-net-crawler/commit/ac6a2a6dfd26c1f906b26cbd9a58c85126c27dd9))
* **$Exercise:** correct parsing the last part of exercises ([4528734](https://github.com/johnnymillergh/exrx-net-crawler/commit/452873420ca844ed7e2f468be76cb99325612341))


### Features

* **$Exercise:** add loading animation ([d6ad4e3](https://github.com/johnnymillergh/exrx-net-crawler/commit/d6ad4e3c34c74de80f3a83b282cc42aea5785be3))
* **$Exercise:** add UI components for parsing and saving specific exercise ([a87d357](https://github.com/johnnymillergh/exrx-net-crawler/commit/a87d35780ac3e2dbca214c5c7f90801061a5e473))
* **$Exercise:** parse and save one single specific exercise ([9141543](https://github.com/johnnymillergh/exrx-net-crawler/commit/91415437862351581aa26f0c18a692ba9c2c587e))
* **$Exercise:** support parsing exercise by body part ([50c0d15](https://github.com/johnnymillergh/exrx-net-crawler/commit/50c0d150f7a17e2cf80252a50cb033bf7426dffb))
* **$HelloWorld:** retrieve backend app info ([62bb630](https://github.com/johnnymillergh/exrx-net-crawler/commit/62bb630221c07464a65e774fa97696a89239bf27))
* **$MultiWindow:** beautify UI ([13fae23](https://github.com/johnnymillergh/exrx-net-crawler/commit/13fae239ebd823d515c378ca25a7c3ec41652b0d))
* **$MultiWindow:** delay 0.6s to open new window ([4318b3a](https://github.com/johnnymillergh/exrx-net-crawler/commit/4318b3a37ce75501be3f3aff39362e2e3de07431))
* **$MultiWindow:** support multi window communication ([34e6927](https://github.com/johnnymillergh/exrx-net-crawler/commit/34e69270cc985843c21472f0b83819d4f9912483))
* **$MultiWindow:** support opening a unique window ([3aa0c9a](https://github.com/johnnymillergh/exrx-net-crawler/commit/3aa0c9a62bcd4e476cb2c6c98cfad64323f7bb32))


### Performance Improvements

* **$Axios:** disable request cancellation ([f992025](https://github.com/johnnymillergh/exrx-net-crawler/commit/f9920258964973c8466dd9cdb3a489418f1bee42))
* **$Axios:** refine generating request token ([4d8c3a0](https://github.com/johnnymillergh/exrx-net-crawler/commit/4d8c3a031bb44b030576003d3e4992276c84c3e2))
* **$Axios:** refine param validation ([9469af7](https://github.com/johnnymillergh/exrx-net-crawler/commit/9469af778d56f15571dae5d511e65cd88c52830a))
* **$Exercise:** add constraint for concurrency ([5a38ab2](https://github.com/johnnymillergh/exrx-net-crawler/commit/5a38ab276449975d866ca764dc70863a0f251634))
* **$Exercise:** capture error when restoring path to URL ([354c6dd](https://github.com/johnnymillergh/exrx-net-crawler/commit/354c6dddd570506358132d4a9a8be19764e2fd27))
* **$Exercise:** refine parsing other exercise ([0457d2e](https://github.com/johnnymillergh/exrx-net-crawler/commit/0457d2e4e833b387f156e895cf5a4c17b5a02d34))
* **$Exercise:** refine parsing stretching exercise ([6005128](https://github.com/johnnymillergh/exrx-net-crawler/commit/60051287ddfc02f42a7f89ee8ffb4823029b49ac))
* **$MultiWindow:** abstract code ([66ab76c](https://github.com/johnnymillergh/exrx-net-crawler/commit/66ab76c4fbd57fa01c06a3177bbb0566574cc563))
* **$MultiWindow:** throw an error when failing to going back to last page ([8dc320e](https://github.com/johnnymillergh/exrx-net-crawler/commit/8dc320e292838527b0ea20eb3752e8c872fb4a6e))
* **$MultiWindow:** use optional chain to avoid error ([fb54364](https://github.com/johnnymillergh/exrx-net-crawler/commit/fb54364051787e3a4a49843bfd6fb4c50ac03d4e))
* **$MultiWindow:** use optional chain to avoid query error ([a82f028](https://github.com/johnnymillergh/exrx-net-crawler/commit/a82f028dce16aca2d3872593b1aa6a882b812b57))
* **$MultiWindow:** use toast to display error info instead of window.alert() ([8f7576e](https://github.com/johnnymillergh/exrx-net-crawler/commit/8f7576eb4d184a08b250ee53b502156a706a7aac))
* **$Muscle:** support sending concurrent requests ([d9cae3e](https://github.com/johnnymillergh/exrx-net-crawler/commit/d9cae3e4d3feb1bf3630c81d9b88aefb651a2192))
* **$package.json:** upgrade dependencies ([beea982](https://github.com/johnnymillergh/exrx-net-crawler/commit/beea982179106ada5833eb0cff6682434ec80078))


### BREAKING CHANGES

* **$Exercise:** refine parsing stretching exercise
* **$Exercise:** parse and save one single specific exercise
* **$Exercise:** support parsing exercise by body part
* **$Muscle:** support sending concurrent requests
* **$MultiWindow:** support multi window communication



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



