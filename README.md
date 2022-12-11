# Release-It Expo Bumper Plugin

A [release-it](https://github.com/release-it/release-it) plugin that increments the Android version code, iOS build
number, and app version in an [Expo](https://expo.io/) app's `app.json` or `app.config.js` file.

## Installation

```bash
# npm
npm install --save-dev @mwillbanks/release-it-expo-bumper-plugin
# yarn
yarn add --save-dev @mwillbanks/release-it-expo-bumper-plugin
```

## Usage

To use the plugin, add it to the `plugins` array in your `release-it` configuration (`.release-it.json` or
`package.json`):

```
"release-it": {
  "plugins": {
    "@mwillbanks/release-it-expo-bumper-plugin": {}
  }
}
```

Then, run the `release-it bump` task or your general `release-it` task:

```
release-it bump
# or
release-it
```

This will increment the Android version code, iOS build number, and app version in your Expo app's `app.json` or
`app.config.js` file.

## License

MIT
