
import {
  getArgs
} from './util.ts';
import CssToken from './csstoken.ts';
import MediaQuery from './media.ts';

const args = getArgs();

export default class Stylesheet {
  tokens: Map<string, CssToken> = new Map();
  queries: Map<string, MediaQuery> = new Map();

  constructor() {}

  addToken(token: CssToken): typeof this {
    if(this.tokens.has(token.key))
      console.warn(`The token ${token.key} already exists in the stylsheet`);
    else {
      this.tokens.set(token.key, token);
      for(const query of token.queries.values()) {
        this.queries.set(query.query, query);
      }
    }
    return this;
  }

  addMedia(mq: MediaQuery): typeof this {
    // Do we have the current query in the stylesheet?
    if(this.queries.has(mq.query)) {
      args.verbose ?
        console.warn(`Stylesheet already has MediaQuery (${mq.query})`) :
        null;
    }
    else
      this.queries.set(mq.query, mq);
    return this;
  }

  async build() {
    await Promise.allSettled([
      this.buildCss('./outfile.css')
    ]);
  }

  private async buildCss(outfile: string) {
    let content = ':root {';

    for(const token of this.tokens.values()) {
      content += token.getCssKey() + ':' + token.value + ';';
    }
    content += '}\n';
    for(const query of this.queries.values()) {
      content += `@media ${query.screenOnly ? 'screen and ' : ''} (${query.query}) { :root {`;
      for(const token of query.tokens.values()) {
        content += `${token.getCssKey()}: ${token.value};`;
      }
      content += '}}\n'
    }
    console.log(content);
    await Deno.writeTextFile(outfile, content);
  }
}
