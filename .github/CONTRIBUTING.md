# Contributing

## Development

- Code should be written on feature branches.
- Feature branches should branch off `master`.
- Follow our [Git style guide](https://github.com/everydayhero/styleguide/blob/master/Git.md) closely.
- Push your branch to GitHub frequently, to avoid losing work.

## Peer Review

- When ready, create a PR for your feature branch, pointing back into `master`.
- Mark your PR as a work-in-progress if it's not ready to be merged.
- Fill in the appropriate pieces of the PR template.
- It is your responsibility to find someone to review it.
- Discuss any feedback the reviewer has, and how you both want to proceed.
- Once you are both happy, the reviewer can merge your PR.

## QA

- Tag a new release candidate using the appropriate [`node-semver` function](https://github.com/npm/node-semver#functions) (premajor, preminor, prepatch or prerelase).
- Build and deploy your prerelease using `npm run deploy-assets` (you'll require permissions to deploy to the shared-scripts s3 bucket).
- Provide a link to the demo page for the newly deployed version `https://shared-scripts.s3.amazonaws.com/hui-[0.0.0-0]/index.html` in your issue / jira ticket along with instructions outling expected behaviour.

## Release

- Tag a new release using the appropriate [`node-semver` function](https://github.com/npm/node-semver#functions) (major, minor, patch)
- Build and deploy your prerelease using `npm run deploy-assets` (you'll require permissions to deploy to the shared-scripts s3 bucket).
