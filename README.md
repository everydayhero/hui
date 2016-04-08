# HUI (◠‿◠)

[![Build status](https://badge.buildkite.com/68863f07d5165ecae59a39d6f548cb66b825ffa7bddb8f614c.svg)](https://buildkite.com/everyday-hero/hui)

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
$ npm run test          # run all tests
$ npm start             # run local server to view demo page
```
## Publishing updates

Updates are published through Buildkite.  There is a manual step for deploying assets and publishing to npm. Make sure you bump the version as per the below specifications.
* Non-breaking changes and bug fixes are a minor revision – e.g. 0.0.(2)
* Breaking changes, css and template re-factors are major revisions – 0.(2).0
* API updates and large additions/changes are major versions – e.g. (1).0.0

The version number should be updated in the `package.json` before publishing.


## Development

The main, stable branch is `master`. All work should be contained in isolated
feature branches and will be merged into `master` when peer reviewed on GitHub.

We maintain version branches for major version bumps. These will be maintained until previous version are deprecated.

### Getting code into master

1. Commit code to a branch
2. Push code to Github, open PR against Master
3. Code is reviewed by peers, on approval, code is merged (not by code author)
4. Code is deployed to QA.
5. Assuming code passes QA, code is released to production.
