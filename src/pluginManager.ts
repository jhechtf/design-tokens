import Plugin from './plugin.ts';
import { injectable, injectAll } from '../deps.ts';
import { Config, Stylesheet } from '../mod.ts';
import { BaseCliArgs } from './cli/cliArgs.ts';

/**
 * onConfigResolved -> when the config has been loaded.
 * onStylesLoaded -> The resolution of the config into a CSS Stylesheet
 * onWrite -> signal sent for plugins to manage their own write responsibilities.
 */
@injectable()
export default class PluginManager {
  #plugins: Plugin[] = [];
  constructor(@injectAll('Plugin') plugins: Plugin[]) {
    this.#plugins = plugins;
  }
  loadConfig(cfg: Config, args: BaseCliArgs) {
    for (let plugin of this.#plugins) {
      if (plugin.onConfigResolved) {
        plugin.onConfigResolved(cfg, args);
      }
    }
  }
  loadStyles(stylesheets: Stylesheet[], args: BaseCliArgs) {
    for (let plugin of this.#plugins) {
      if (plugin.onStylesLoaded) {
        plugin.onStylesLoaded(stylesheets, args);
      }
    }
  }
  async write(args: BaseCliArgs, stylesheets: Stylesheet[]) {
    for (let plugin of this.#plugins) {
      if (plugin.onWrite) {
        const content = await plugin.onWrite(args, stylesheets);
        const directory = args.directory;
        console.info(content, directory);
        Deno.writeTextFile(content.name, content.content);
      }
    }
  }
}
