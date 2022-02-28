
import {
  normalizeCssQuery,
  getArgs
} from './util.ts';
import CssToken from './csstoken.ts';

const args = getArgs();

export default class MediaQuery {

  // Start static properties
  static queries = new Map();

  static findOrCreate(query: string): MediaQuery {
    const normalized = normalizeCssQuery(query);
    if(MediaQuery.queries.has(normalized)) return MediaQuery.queries.get(normalized);
    const mq = new MediaQuery(normalized);
    MediaQuery.queries.set(normalized, mq);
    return mq;
  }

  tokens: Map<string, CssToken> = new Map();

  /**
   * 
   * @param query the query
   * @param screenOnly screen only?
   * @description do not use this directly. instead use the `MediaQuery.findOrCreate()` method
   */
  constructor(public query: string, public screenOnly = true) {
  }

  addValue(token: CssToken): typeof this {
    // If we already have the token, give a warning.
    if(this.tokens.has(token.key)) {
      args.verbose ? 
        console.warn(`Token ${token.key} already exists in MediaQuery (${this.query}).`) :
        null;
      return this;
    }

    this.tokens.set(token.key, token);
    return this;
  }
}
