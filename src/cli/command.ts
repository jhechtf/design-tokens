import { Args } from '../../deps.ts';

export interface CommandDescriptor {
  name: string;
  help?: string;
}

export default interface Command {
  register(): CommandDescriptor;
  handler(args: Args): Promise<number>;
}
export default class Command {

}