# [2.0.0](https://github.com/tafarij/micro-correlation-id/compare/v1.2.1...v2.0.0) (2022-12-04)


### Features

* **breaking-change:** swap cls-hooked for async local storage ([1bdc25d](https://github.com/tafarij/micro-correlation-id/commit/1bdc25da232edc4373ca52f5e3722526b5224cef))


### BREAKING CHANGES

* **breaking-change:** swaps cls-hooked for Node's AsyncLocalStorage. The API is unchanged, but the package now requires node@16 or greater.
