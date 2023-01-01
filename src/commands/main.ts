import { Command } from './command.skip.ts';

import { getConfigFromImport, parseBaseConfig } from '../util.ts';
import { container, green, red } from '../../deps.ts';
import PluginManager from '../pluginManager.ts';

import { MediaQuery, Stylesheet } from '../../mod.ts';
import { BaseCliArgs } from '../cli/cliArgs.ts';

export default {
  signature: '*',
  description: 'Default command',
  handler: async ({
    config: configPath = 'configuration.ts',
    ...args
  }) => {
    try {
      // Base plugins
      const basePlugins: Map<string, string> = new Map(
        [
          ['js', '../plugins/javascript.ts'],
          ['css', '../plugins/css.ts'],
          ['scss', '../plugins/scss.ts'],
        ],
      );

      if (args.javascript !== undefined && !args.javascript) {
        basePlugins.delete('js');
      }
      if (args.css !== undefined && !args.css) basePlugins.delete('css');
      if (args.scss !== undefined && !args.scss) basePlugins.delete('scss');

      let plugins = Array.from(basePlugins.values());
      if (args.plugin) {
        plugins = plugins.concat(args.plugin);
      }
      // Plugins mapped, attempt to use now.
      const pluginUrls = plugins.map((plugin) =>
        new URL(plugin, import.meta.url).href
      );
      const results = await Promise.allSettled(
        pluginUrls.map((url) => import(url).then((res) => res.default)),
      );
      // Do some alerting to the failures.
      const failures = results.filter((res) => res.status === 'rejected');
      failures.forEach((fail) =>
        console.warn(
          `Plugin failed to load with error: ${fail.status === 'rejected' && fail.reason
          }`,
        )
      );
      // Create the plugin manager
      const manager = container.resolve(PluginManager);

      // Grab the config -- onConfigResolved
      const config = await getConfigFromImport(configPath);
      manager.loadConfig(config, args as BaseCliArgs);
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
      manager.loadStyles([styles], args as BaseCliArgs);

      // Begin onWrite
      // const responses = await styles.buildAndWrite({
      //   directory: args.directory,
      //   fileName: args.fileName,
      // });

      await manager.write(args as BaseCliArgs, [styles]);

      // end onWrite
    } catch (e) {
      if (e instanceof Error) {
        console.error(red('ERROR'), e.name, e.message);
      }
    }
  },
} as Command;
