export default class Cli {
  commands: Map<string, {run(): number}> = new Map();
}