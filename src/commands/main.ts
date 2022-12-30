import { Command } from './command.skip.ts';

import { getConfigFromImport, parseBaseConfig } from '../util.ts';
import { green, red } from '../../deps.ts';

import { MediaQuery, Stylesheet } from '../../mod.ts';

export default {
  signature: '*',
  description: 'Default command',
  handler: async ({
    config: configPath = 'configuration.ts',
    ...args
  }) => {
    try {
      // Grab the config -- onConfigResolved
      const config = await getConfigFromImport(configPath);
      // Make the base stylesheet
      const styles = new Stylesheet();
      // Parse the base config.
      parseBaseConfig(config, styles);

      // If we have variants, we need to parse them just like we would if they were regular files.
      if (config.variants) {
        for (const [query, subConfig] of Object.entries(config.variants)) {
          const mq = new MediaQuery(query);
          styles.addQuery(mq);
          parseBaseConfig(subConfig, mq);
        }
      }
      // onStylesLoaded?

      // Begin onWrite
      const responses = await styles.buildAndWrite({
        directory: args.directory,
        fileName: args.fileName,
      });

      if (responses.every((e) => e.status === 'fulfilled' && e.value)) {
        console.info(green(`Successfully wrote files`));
      }
      // end onWrite
    } catch (e) {
      if (e instanceof Error) {
        console.error(red('ERROR'), e.name, e.message);
      }
    }
  },
} as Command;
