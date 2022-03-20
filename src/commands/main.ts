import { Command } from './command.ts';

import { getConfigFromImport, parseBaseConfig } from '../util.ts';

import { MediaQuery, Stylesheet } from '../../mod.ts';

export default {
  signature: '*',
  description: 'Default command',
  handler: async ({
    config: configPath = 'configuration.ts',
    ...args
  }) => {
    // Grab the config
    const config = await getConfigFromImport(configPath);
    // Make the base stylesheet
    const styles = new Stylesheet();
    // Parse the base config.
    parseBaseConfig(config, styles);
    if (config.variants) {
      for (const [query, subConfig] of Object.entries(config.variants)) {
        const mq = new MediaQuery(query);
        styles.addQuery(mq);
        parseBaseConfig(subConfig, mq);
      }
    }

    await styles.buildAndWrite({
      directory: args.directory,
      fileName: args.fileName,
    });
  },
} as Command;
