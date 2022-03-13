# Design Tokens

Trying to create design tokens that can be used in CSS, SCSS, and Javascript/Typescript? 

_Yeah, me too._

## Notes

In the end I hope that there will be two ways that users can use this library:

1. In code, by importing the relevant items / functions and building it themselves or 
2. By using a CLI tool with a config file (aiming for it to be TS, but considering JSON) to generate it the necessary files in one shot.

## Usage

Currently the code can be used with the following examples.

__*NOTE*__: This needs to be hard updated to reflect changes.

```ts
import { Stylesheet, Token, MediaQuery, TokenType } from '//design-tokens-url.ts';
// Creates a new stylesheet
const stylesheet = new Stylesheet();
// create the tokens.
const primaryToken = new Token('primary-color', '#fecc99');
const spacingToken = new Token('gap', '4px', TokenType.SIZE);
// Necessary breakpoints
const darkMediaQuery = MediaQuery.findOrCreate('prefers-color-scheme: dark');
const mdBreakpointQuery = MediaQuery.findOrCreate('min-width: 370px');
// Primary token has a dark mode value
primaryToken.addMediaQueryValue(darkMediaQuery, '#99ff44');
// Spacing token changes on "medium" screensize"
spacingToken.addMediaQueryValue(mdBreakpointQuery, '8px');
// Add the tokens to the stylesheet
stylesheet.addTokens(primaryToken, spacingToken);
// build the stylesheet + JS tokens
await stylesheet.build({});
```

This will generate two files, `tokens.js` and `tokens.css` which have the following values:

**Note**: this values will appear "flattened" (not minimized) when they are output. These have been modified to be more readable.

```js
export const colorPrimaryColor = 'var(--color-primary-color)';
export const sizeGap = 'var(--size-gap)';
```

```css
:root {
  --color-primary-color:#fecc99;
  --size-gap:4px;
}
@media screen and (prefers-color-scheme: dark) { 
  :root {
    --color-primary-color: #99ff44;
  }
}
@media screen and (max-width: 370px) { 
  :root {
    --size-gap: 8px;
  }
}
```

These files can be bundled as part of your design-tokens package and distributed out.