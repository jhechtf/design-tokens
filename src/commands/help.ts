import { Command } from './command.skip.ts';

export default {
  signature: 'help',
  description: 'Outputs the help dialog to get you started',
  handler: () => {
    console.log(
      `Welcome to the CLI For Token Generation - CLIFTG for ... somewhat shorter.

    
    ---Options---

    REQUIRED:

    --config [filename]\t loads the given [filename] parameter and generates the stylesheet objects from there.

    OPTIONAL:
    --directory [dir] Where to output the generated files. Defaults to the current directory
    --file-name [name] What the generated JS + CSS files should be named.
    --help Shows this help message
    --version shows the current version of the CLI
    `,
    );
  },
} as Command;
