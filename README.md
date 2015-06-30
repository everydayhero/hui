# HUI (◠‿◠)

[![Build Status](https://semaphoreci.com/api/v1/projects/50b2d44c-21b4-4627-b63f-ab5f1beb261a/383098/badge.svg)](https://semaphoreci.com/everydayherodev/hui)

EDH UI library to share layout and components between applications.

For full documentation, please refer to the [EDH HUI docs](http://everydayhero.github.io/public-api-docs/hui)

## Location

You can find the minified assets at the following locations:

- `//d1ig6folwd6a9s.cloudfront.net/hui-[0.0.0].js`
- `//d1ig6folwd6a9s.cloudfront.net/hui-[0.0.0].css`
– `//d1ig6folwd6a9s.cloudfront.net/hui-[0.0.0]/images/[image-name]`

To view the uncached version of deployed files go to:

- `https://shared-scripts.s3.amazonaws.com/hui-[0.0.0].js`
- `https://shared-scripts.s3.amazonaws.com/hui-[0.0.0].css`
- `https://shared-scripts.s3.amazonaws.com/hui-[0.0.0]/images/[image-name]`

You can view the demo html file at:

- `https://shared-scripts.s3.amazonaws.com/hui-[0.0.0]/index.html`

## Commands

OSX users may need to increase the maximum number of open files (default is 256) using `ulimit -Sn 1000` to use build, watch, and scripts commands.

```sh
$ npm install           # download npm dependencies
$ gulp                  # build all production assets
$ gulp --debug          # build all unminified assets (for debugging)
$ gulp scripts          # build script assest (Can also use the --debug flag)
$ gulp styles           # build styles assest (Can also use the --debug flag)
$ npm run jest          # run jest test
$ npm run spec          # run mocha tests
$ npm run test          # run all tests
$ npm run deploy-assets # publish build files to S3 bucket (AWS_KEY and AWS_SECRET environment variables must be set)
$ npm start             # run local server to view demo page
```
## Publishing updates

* Non-breaking changes and bug fixes are a minor revision – e.g. 0.0.(2)
* Breaking changes, css and template re-factors are major revisions – 0.(2).0
* API updates and large additions/changes are major versions – e.g. (1).0.0

The version number should be updated in the `package.json` before publishing.
