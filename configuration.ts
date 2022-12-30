import { Config } from './mod.ts';

export default {
  color: {
    primary: 'blue',
    something: 'orange'
  },
  size: {
    font: {
      xs: '0.5rem',
      sm: '0.625rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.35rem',
    },
  },
  variants: {
    'prefers-color-scheme: dark': {
      color: {
        primary: 'lightblue',
      },
    },
  },
} as Config;
