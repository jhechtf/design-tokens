import {
  ensureDir
} from 'https://deno.land/std@0.127.0/fs/mod.ts';
import {
  getArgs,
  camelCase
} from './util.ts';
import Token from './token.ts';
import Selector from './selector.ts';
import MediaQuery from './media.ts';

const args = getArgs();

interface BuildOptions {
  directory?: string;
  fileName?: string | Record<'js' | 'css', string>; 
}

export default class Stylesheet {
  queries: Map<string, MediaQuery> = new Map();
  selectors: Set<Selector> = new Set();

  #root = new Selector();

  constructor() {
    this.selectors.add(this.#root);
  }

  addSelector(selector: Selector): typeof this {
    this.selectors.add(selector);
    return this;
  }

  addSelectors(...args: Selector[]): typeof this {
    args.forEach(sel => this.addSelector(sel));
    return this;
  }
  
  addToken(token: Token, selector: Selector = this.#root): typeof this {
    if(!this.selectors.has(selector)) this.selectors.add(selector);
    selector.addToken(token);
    return this;
  }

  addTokens(selector: Selector = this.#root, ...tokens: Token[]): typeof this {
    if(!this.selectors.has(selector)) this.selectors.add(selector);
    tokens.forEach(token => this.addToken(token));
    return this;
  }

  addQuery(query: MediaQuery): typeof this {
    if(!this.queries.has(query.query)) this.queries.set(query.query, query);
    return this;
  }

  build() {
    return {
      css: this.buildCss(),
      js: this.buildJs()
    };
  }

  async buildAndWrite({
    fileName = 'tokens',
    directory
  }: BuildOptions) {
    const outputFiles = {
      js: fileName+'.js',
      css: fileName+'.css'
    }

    if(directory) {
      await ensureDir(directory);
      outputFiles.js = `${directory}/${outputFiles.js}`;
      outputFiles.css = `${directory}/${outputFiles.css}`;
    }

    const outputs = this.build();

    return Promise.allSettled([
      Deno.writeTextFile(outputFiles.js, outputs.js)
        .then(() => true)
        .catch(e => {
          console.error(e);
          return false;
        }),
      Deno.writeTextFile(outputFiles.css, outputs.css)
        .then(() => true)
        .catch(e => {
          console.error(e);
          return false
        })
    ])

  }


  private buildCss() {
    let output = '';
    for(const selector of this.selectors.values()) {
      output += selector.build();
    }
    output +='\n\n';
    for(const mq of this.queries.values()) {
      if(mq.hasTokens())
        output += mq.build();
    }
    return output;
  }

  private buildJs() {
    let output = '';
    for(const token of this.#root.tokens.values()) {
      output += token.toJsToken() + ';\n';
    }
    return output;
  }
}
