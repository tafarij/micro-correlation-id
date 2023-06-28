## [2.0.1](https://github.com/tafarij/micro-correlation-id/compare/v2.0.0...v2.0.1) (2023-06-28)


### Bug Fixes

* Bump json5 from 2.2.1 to 2.2.3 ([#19](https://github.com/tafarij/micro-correlation-id/issues/19)) ([81c302c](https://github.com/tafarij/micro-correlation-id/commit/81c302c93a57146e8dc3186e82ae68c7d47d1116))

# [2.0.0](https://github.com/tafarij/micro-correlation-id/compare/v1.2.1...v2.0.0) (2022-12-04)


### Features

* **breaking-change:** swap cls-hooked for async local storage ([1bdc25d](https://github.com/tafarij/micro-correlation-id/commit/1bdc25da232edc4373ca52f5e3722526b5224cef))


### BREAKING CHANGES

* **breaking-change:** swaps cls-hooked for Node's AsyncLocalStorage. The API is unchanged, but the package now requires node@16 or greater.
