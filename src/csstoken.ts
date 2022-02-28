
import MediaQuery from "./media.ts";
import { TokenType } from "./variables.ts";
import { camelCase } from './util.ts';


export default class CssToken {

  queries: Set<MediaQuery> = new Set();
  /**
   * 
   * @param key key is meant to be a css-compatible variable name, e.g. "some-string-here".
   * This will become camelCased when exported to TS variables
   * @param value can either be a string value or another CssToken
   * @param type the type will be prepended to the variable names when made. 
   */
  constructor(
    public key: string,
    public value: string | CssToken,
    public type = TokenType.COLOR,
  ) {
  }

  addMediaQueryValue(mq: MediaQuery, value: string | CssToken): typeof this {
    if(typeof value === 'string') value = new CssToken(this.key, value, this.type);
    mq.addValue(value);
    this.queries.add(mq);
    return this;
  }

  getCssKey(): string {
    return `--${this.type}-${this.key}`;
  }

}
