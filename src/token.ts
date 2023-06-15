import MediaQuery from './media.ts';
import { camelCase } from './util.ts';

export default class Token {
  queries: Set<MediaQuery> = new Set();
  public value: string | Token;
  /**
   * @param key key is meant to be a css-compatible variable name, e.g. "some-string-here".
   * This will become camelCased when exported to TS variables
   * @param value can either be a string value or another Token
   * @param type the type will be prepended to the variable names when made.
   */
  constructor(
    public key: string,
    value: string | number | Token,
    public type = 'color',
  ) {
    this.value = typeof value === 'number' ? `${value}px` : value;
  }

  addMediaQueryValue(mq: MediaQuery, value: string | Token): Token {
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

export interface TokenConsumer {
  addToken(token: Token): unknown;
}
