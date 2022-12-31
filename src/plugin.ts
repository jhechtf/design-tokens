import Stylesheet from './stylesheet.ts';
import { Config } from './types.d.ts';
import { BaseCliArgs, CliArgs } from './cli/cliArgs.ts';

export interface Content {
  name: string;
  content: string;
}

export default interface Plugin {
  onConfigResolved?(config: Config, args: BaseCliArgs): void;
  onStylesLoaded?(stylesheets: Stylesheet[], args: BaseCliArgs): void;
  onWrite?(args: BaseCliArgs, stylesheets: Stylesheet[]): Promise<Content>;
}

export default class Plugin {
}
