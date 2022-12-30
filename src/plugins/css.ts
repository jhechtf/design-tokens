import Plugin from '../plugin.ts';
import { CliArgs } from '../cli/cliArgs.ts';
import Stylesheet from '../stylesheet.ts';

export default class CssPlugin extends Plugin {
  onWrite<T>(args: CliArgs<T>, stylesheets: Stylesheet[]) {
    let output = '';
    for(const stylesheet of stylesheets) {
      for( const selector of stylesheet.selectors.values()) {
        output += selector.build();
      }
      output += '\n\n';
      for(const mq of stylesheet.queries.values()) {
        if(mq.hasTokens()) {
          output += mq.build() + '\n';
        }
      }
    }

    return Promise.resolve({
      name: 'tokens.css',
      content: output,
    });
  }
}
