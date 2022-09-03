import { Args } from '../../deps.ts';

export type CliArgs<T> = T extends Args ? T : T & Args;