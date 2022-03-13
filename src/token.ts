import MediaQuery from './media.ts';
import { camelCase } from './util.ts';

export default class Token {
  queries: Set<MediaQuery> = new Set();
  /**
   * @param key key is meant to be a css-compatible variable name, e.g. "some-string-here".
   * This will become camelCased when exported to TS variables
   * @param value can either be a string value or another Token
   * @param type the type will be prepended to the variable names when made.
   */
  constructor(
    public key: string,
    public value: string | Token,
    public type = 'color',
  ) {
  }

  addMediaQueryValue(mq: MediaQuery, value: string | Token): typeof this {
    if (typeof value === 'string') {
      value = new Token(this.key, value, this.type);
    } else value = new Token(this.key, value);
    mq.addToken(value);
    this.queries.add(mq);
    return this;
  }

  toCssValue(): string {
    if (this.value instanceof Token) {
      return `var(${this.value.getCssKey()})`;
    }
    return this.value;
  }

  getCssKey(): string {
    return `--${this.type}-${this.key}`;
  }

  toJsToken(): string {
    return `export const ${
      camelCase(this.type + '-' + this.key)
    } = 'var(${this.getCssKey()})'`;
  }
}
