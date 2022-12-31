import { Stylesheet } from '../../mod.ts';
import { CliArgs } from '../cli/cliArgs.ts';
import Plugin, { Content } from '../plugin.ts';
import { injectable, registry } from '../../deps.ts';

@injectable()
@registry(
  [
    {
      token: 'Plugin',
      useToken: ScssPlugin,
    },
  ],
)
export default class ScssPlugin extends Plugin {
  onWrite<T>(_args: CliArgs<T>, stylesheets: Stylesheet[]): Promise<Content> {
    let output = '';

    for (const stylesheet of stylesheets) {
      for (const selector of stylesheet.selectors.values()) {
        for (const token of selector.tokens.values()) {
          output += `\n$${
            token.getCssKey().slice(2)
          }: ${token.value} !default;`;
        }
      }
    }

    return Promise.resolve({
      name: 'something.scss',
      content: output,
    });
  }
}
