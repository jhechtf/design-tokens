# Raven (Design Token Generator)

Trying to create design tokens that can be used in CSS, SCSS, and
Javascript/Typescript?

_Yeah, me too._

## Notes

In the end I hope that there will be two ways that users can use this library:

1. In code, by importing the relevant items / functions and building it
   themselves or
2. By using a CLI tool with a config file (aiming for it to be TS, but
   considering JSON) to generate it the necessary files in one shot.

## Usage

Currently the code can be used with the following examples.

```ts
import { MediaQuery, Stylesheet, Token } from './mod.ts';
// Creates a new stylesheet
const stylesheet = new Stylesheet();
// create the tokens.
const primaryToken = new Token('primary-color', '#fecc99');
const spacingToken = new Token('gap', '4px', 'size');
const blueToken = new Token('blue-100', '#11339e');
// Necessary breakpoints
const darkMediaQuery = new MediaQuery('prefers-color-scheme: dark');
const mdBreakpointQuery = new MediaQuery('min-width: 370px');
// Primary token has a dark mode value
primaryToken.addMediaQueryValue(darkMediaQuery, blueToken);
// Spacing token changes on "medium" screensize"
spacingToken.addMediaQueryValue(mdBreakpointQuery, '8px');
// Add the tokens to the stylesheet
stylesheet
  .addToken(primaryToken)
  .addToken(spacingToken)
  .addToken(blueToken);
// Add the media queries
stylesheet
  .addQuery(darkMediaQuery)
  .addQuery(mdBreakpointQuery);
// build the stylesheet + JS tokens
await stylesheet.buildAndWrite({});
```

This will generate two files, `tokens.js` and `tokens.css` which have the
following values:

**Note**: this values will appear "flattened" (not minimized) when they are
output. These have been modified to be more readable.

```js
export const colorPrimaryColor = 'var(--color-primary-color)';
export const sizeGap = 'var(--size-gap)';
export const colorBlue100 = 'var(--color-blue-100)';
```

```css
:root {
  --color-primary-color: #fecc99;
  --size-gap: 4px;
  --color-blue-100: #11339e;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-color: var(--color-blue-100);
  }
}
@media (min-width: 370px) {
  :root {
    --size-gap: 8px;
  }
}
```

These files can be bundled as part of your design-tokens package and distributed
out.

## Installation

To install the cli run the following script:

```
$ deno install -A https://raw.githubusercontent.com/jhechtf/design-tokens/mainline/src/cli.ts --name raven
```

I would recommend using scoped down permission for `--allow-read` and `--allow-write` if able,
but you would also need to add `--allow-env`

### Usage

After installing creating a `config.ts` file with the following content

```ts
import type {
  Config,
} from 'https://raw.githubusercontent.com/jhechtf/design-tokens/mod.ts';

export default {
  colors: {
    primary: 'blue',
    secondary: 'orange',
    blue: {
      100: '#33ff99',
    },
  },
  size: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  variants: {
    'prefers-color-scheme: dark': {
      colors: {
        primary: 'lightblue',
        secondary: 'paleorange',
      },
    },
  },
} as Config;
```

Then run

```
raven --config config.ts
```

**Notes:** You can export singular instances in the config, such as

```ts
export const colors = {
  primary: 'red',
  secondary: 'puprple',
};

export const sizes = {
  sm: 4,
  md: 8,
  lg: 12,
};

export const variants = {
  'prefers-color-scheme: dark': {
    primary: 'hsl(0,0, 50%)',
  },
};
```

## FAQ

### Raven?

I like ravens and crows.
