export type CssValue = number | string;
export type SubToken = Record<number, CssValue>;
export type TokenMap = Record<string, CssValue | SubToken>;
export interface TypeMap {
  [type: string]: TokenMap;
}

export type Config = TypeMap & {
  variants?: {
    [query: string]: TypeMap;
  };
};
