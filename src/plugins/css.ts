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
  onWrite(args: BaseCliArgs, stylesheets: Stylesheet[]) {
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

    const {
      'file-name': fileName = 'tokens',
    } = args;

    return Promise.resolve({
      name: `${fileName}.css`,
      content: output,
    });
  }
}
