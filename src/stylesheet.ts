import {
  ensureDir
} from 'https://deno.land/std@0.127.0/fs/mod.ts';
import {
  getArgs,
  camelCase
} from './util.ts';
import CssToken from './csstoken.ts';
import MediaQuery from './media.ts';

const args = getArgs();

interface BuildOptions {
  directory?: string;
  fileName?: string | Record<'js' | 'css', string>; 
}

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

  addTokens(...args: CssToken[]): typeof this {
    for(const token of args) {
      this.addToken(token);
    }
    return this;
  }

  async build({
    fileName = 'tokens',
    directory
  }: BuildOptions) {
    const filenames = {
      js: `${fileName}.js`,
      css: `${fileName}.css`
    }
    if(directory) {
      await ensureDir(directory);
      filenames.js = `${directory}/${filenames.js}`;
      filenames.css = `${directory}/${filenames.css}`;
    }
    if(typeof fileName === 'object') {
      filenames.js = `${directory}/${fileName.js}`;
      filenames.css = `${directory}/${fileName.css}`
    }
    return Promise.allSettled([
      this.buildCss(filenames.css),
      this.buildJs(filenames.js)
    ]);
  }

  private buildCss(outfile: string) {
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
      content += '}}\n';
    }
    return Deno.writeTextFile(outfile, content)
      .then(() => true)
      .catch(() => false);
  }

  private buildJs(outfile: string) {
    let content = '';
    for(const token of this.tokens.values()) {
      content += `export const ${camelCase(token.type+'-'+token.key)} = 'var(${token.getCssKey()})';`;
    }
    console.log('writing', content, ' to ', outfile);
    return Deno.writeTextFile(outfile, content)
      .then(() => true)
      .catch(() => false);
  }
}
