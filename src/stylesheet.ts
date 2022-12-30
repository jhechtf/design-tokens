import { ensureDir } from '../deps.ts';
import Token from './token.ts';
import Selector from './selector.ts';
import MediaQuery from './media.ts';

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

  addSelector(selector: Selector): Stylesheet {
    this.selectors.add(selector);
    return this;
  }

  addSelectors(...args: Selector[]): Stylesheet {
    args.forEach((sel) => this.addSelector(sel));
    return this;
  }

  addToken(token: Token, selector: Selector = this.#root): Stylesheet {
    if (!this.selectors.has(selector)) this.selectors.add(selector);
    selector.addToken(token);
    return this;
  }

  addTokens(selector: Selector = this.#root, ...tokens: Token[]): Stylesheet {
    if (!this.selectors.has(selector)) this.selectors.add(selector);
    tokens.forEach((token) => this.addToken(token));
    return this;
  }

  addQuery(query: MediaQuery): Stylesheet {
    if (!this.queries.has(query.query)) this.queries.set(query.query, query);
    return this;
  }

  build() {
    return {
      css: this.buildCss(),
      js: this.buildJs(),
      scss: this.buildScss(),
    };
  }

  async buildAndWrite({
    fileName = 'tokens',
    directory,
  }: BuildOptions) {
    const outputFiles = {
      js: fileName + '.js',
      css: fileName + '.css',
      scss: `${fileName}.scss`,
    };

    if (directory) {
      await ensureDir(directory);
      outputFiles.js = `${directory}/${outputFiles.js}`;
      outputFiles.css = `${directory}/${outputFiles.css}`;
      outputFiles.scss = `${directory}/${outputFiles.scss}`;
    }

    const outputs = this.build();

    return Promise.allSettled([
      Deno.writeTextFile(outputFiles.js, outputs.js)
        .then(() => true)
        .catch((e) => {
          console.error(e);
          return false;
        }),
      Deno.writeTextFile(outputFiles.css, outputs.css)
        .then(() => true)
        .catch((e) => {
          console.error(e);
          return false;
        }),
      Deno.writeTextFile(
        outputFiles.scss,
        outputs.scss,
      ),
    ]);
  }

  // TODO: Move all of the private methods out and into their own thing.
  private buildCss() {
    let output = '';
    for (const selector of this.selectors.values()) {
      output += selector.build();
    }
    output += '\n\n';
    for (const mq of this.queries.values()) {
      if (mq.hasTokens()) {
        output += mq.build() + '\n';
      }
    }
    return output;
  }

  private buildScss() {
    let output = '';
    for (const token of this.#root.tokens.values()) {
      output += `\n$${token.getCssKey().slice(2)}: ${token.value} !default;`;
    }
    return output;
  }

  private buildJs() {
    let output = '';
    for (const token of this.#root.tokens.values()) {
      output += token.toJsToken() + ';\n';
    }
    return output;
  }
}
