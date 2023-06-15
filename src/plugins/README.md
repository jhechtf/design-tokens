## Default Plugins

The default plugins are

1. Javascript
2. CSS
3. SCSS

Each of which can be disabled with the `--no-[plugin name]`, e.g.

```sh
# disables SCSS output.
$ raven --no-scss 
# disables JS Tokens
$ raven --no-javascript
# disables CSS
$ raven --no-css
```

For the API you can disable these by doing

```ts
import { raven } from 'https://deno.land/x/raven@[version]/mod.ts';
const tokens = raven({ configuration: './config.json', disableScss: true });
await tokens.build();
```
