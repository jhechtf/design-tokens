import type Token from './token.ts';
export default class Selector {
  tokens: Set<Token> = new Set();
  constructor(public selector: string = ':root', public screenOnly = false) {}
  addToken(token: Token) {
    this.tokens.add(token);
    return this;
  }
  build(): string {
    let output = `${this.selector} {`;
    for(const token of this.tokens.values()) {
      output+= `\n  ${token.toCssToken()}`
    }
    output += '\n}';
    return output;
  }
}