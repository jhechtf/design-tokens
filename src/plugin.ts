import Stylesheet from './stylesheet.ts';
import { Config } from './types.d.ts';
import { CliArgs } from './cli/cliArgs.ts';

export interface Content {
  name: string;
  content: string;
}

export default interface Plugin {
  onConfigResolved?(config: Config): void;
  onStylesLoaded?(stylesheets: Stylesheet[]): void;
  onWrite?<T>(args: CliArgs<T>, stylesheets: Stylesheet[]): Promise<Content>;
}

export default class Plugin {
}
