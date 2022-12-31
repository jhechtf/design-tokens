import Plugin from '../plugin.ts';
import { BaseCliArgs } from '../cli/cliArgs.ts';
import Stylesheet from '../stylesheet.ts';
import { injectable, registry } from '../../deps.ts';

@injectable()
@registry([
  {
    token: 'Plugin',
    useToken: CssPlugin,
  },
])
export default class CssPlugin extends Plugin {
  async onWrite(_args: BaseCliArgs, stylesheets: Stylesheet[]) {
    let output = '';
    for (const stylesheet of stylesheets) {
      for (const selector of stylesheet.selectors.values()) {
        output += selector.build();
      }
      output += '\n\n';
      for (const mq of stylesheet.queries.values()) {
        if (mq.hasTokens()) {
          output += mq.build() + '\n';
        }
      }
    }

    return {
      name: 'hobitses.css',
      content: output,
    };
  }
}
