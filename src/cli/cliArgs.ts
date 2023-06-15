import { Args } from '../../deps.ts';

export type CliArgs<T> = T extends BaseCliArgs ? T : T & BaseCliArgs;

export interface BaseCliArgs extends Args {
  'no-scss': boolean;
  'no-javascript': boolean;
  'no-css': boolean;
  configuration: string;
  outdir: string;
  dir: string;
}
