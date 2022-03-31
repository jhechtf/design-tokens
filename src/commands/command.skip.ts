import { Args } from '../../deps.ts';

type AsyncHandler = (args: Args) => Promise<void>;
type Handler = (args: Args) => void;

export interface Command {
  signature: string;
  description: string;
  handler: AsyncHandler | Handler;
}
