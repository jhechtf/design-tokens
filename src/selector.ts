import { Buildable } from './buildable.ts';
import Token from './token.ts';
export default class Selector implements Buildable {
  tokens = new Set<Token>();
  constructor(
    public readonly selector: string = ':root',
  ) {}

  addToken(token: Token): typeof this {
    this.tokens.add(token);
    return this;
  }

  build() {
    let output = `${this.selector} {`;
    for (const token of this.tokens.values()) {
      output += `\n  ${token.getCssKey()}: ${token.toCssValue()};`;
    }
    output += '\n}';
    return output;
  }
}
