
import {
  normalizeCssQuery,
  getArgs
} from './util.ts';
import Token from './token.ts';
import Selector from './selector.ts';
import { Buildable } from './buildable.ts';

const args = getArgs();

export default class MediaQuery implements Buildable {

  static queries = new Map<string, MediaQuery>();
  #selector = new Selector(':root');

  constructor(public query: string, public screenOnly = false) {
    const normalized = normalizeCssQuery(query);
    if(MediaQuery.queries.has(normalized+'_'+screenOnly)) {
      return MediaQuery.queries.get(normalized) as MediaQuery;
    }
    MediaQuery.queries.set(normalized+'_'+screenOnly, this);
    this.query = normalized;  
  }

  addToken(token: Token): typeof this {
    this.#selector.addToken(token);
    return this;
  }

  build() {
    let output = `@media${this.screenOnly ? ' screen and': ''} (${this.query}) {`
    output += '\n' + this.#selector.build();
    output += '\n}'
    return output;
  }

  hasTokens(): boolean {
    return this.#selector.tokens.size > 0;
  }

  get selector() {
    return this.#selector.tokens;
  }
}
 