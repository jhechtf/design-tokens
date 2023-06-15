import { Stylesheet } from '../../mod.ts';
import { BaseCliArgs } from '../cli/cliArgs.ts';
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
  onWrite(args: BaseCliArgs, stylesheets: Stylesheet[]): Promise<Content> {
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

    const {
      'file-name': fileName = 'tokens',
      'as-partial': asPartial = true,
    } = args;
    console.info(args);

    return Promise.resolve({
      name: `${asPartial ? '_' : ''}${fileName}.scss`,
      content: output,
    });
  }
}
