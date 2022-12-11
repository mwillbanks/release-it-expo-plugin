import { Plugin } from 'release-it';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

class ExpoBumperPlugin extends Plugin {
  async bump(version) {
    // Read the app config file
    let appConfigPath = path.resolve(process.cwd(), 'app.json');
    let appConfig;
    if (!existsSync(appConfigPath)) {
      appConfigPath = path.resolve(process.cwd(), 'app.config.js');
      appConfig = await import(appConfigPath);
    } else {
      appConfig = JSON.parse(readFileSync(appConfigPath, 'utf8'));
    }

    // Increment the Android version code
    const versionCode = appConfig.expo?.android?.versionCode || 0;
    appConfig.expo.android.versionCode = versionCode + 1;

    // Increment the iOS build number
    const buildNumber = appConfig.expo?.ios?.buildNumber ? parseInt(appConfig.expo.ios.buildNumber, 10) : 1;
    appConfig.expo.ios.buildNumber = `${buildNumber + 1}`;

    // Set the version in app config
    appConfig.expo.version = version;

    // Write the app config file
    if (appConfigPath.endsWith('.json')) {
      writeFileSync(appConfigPath, JSON.stringify(appConfig, null, 2), 'utf8');
    } else {
      // app.config.js is a CommonJS module, so we need to
      // use module.exports instead of just exporting the object
      const output = `module.exports = ${JSON.stringify(appConfig, null, 2)};`;
      writeFileSync(appConfigPath, output, 'utf8');
    }
  }
}

export default ExpoBumperPlugin;
