import test from 'bron';

import assert from 'assert';
import mock from 'mock-fs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { factory, runTasks } from 'release-it/test/util/index.js';
import ExpoBumperPlugin from './index.js';

mock({
  'app.json': JSON.stringify({
    expo: {
      version: '1.0.0',
      android: {
        versionCode: 1
      },
      ios: {
        buildNumber: '1'
      }
    }
  })
});

const namespace = '@mwillbanks/release-it-expo-bumper-plugin';
const options = { [namespace]: {} };

test('should increment the Android version code, iOS build number, and app version', async () => {
  // Set up the release-it configuration
  const plugin = factory(ExpoBumperPlugin, { namespace, options });

  // Run the bump task
  await runTasks(plugin, ['bump']);

  // Verify that the app.json file was updated correctly
  const updatedAppJson = JSON.parse(readFileSync(join(process.cwd(), 'app.json'), 'utf8'));
  assert.deepEqual(updatedAppJson, {
    expo: {
      version: '1.0.1',
      android: {
        versionCode: 2
      },
      ios: {
        buildNumber: '2'
      }
    }
  });
});
