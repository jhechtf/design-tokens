import { CliArgs } from './cli/cliArgs.ts';
interface RavenArgs {
  noJavascript?: boolean;
  noScss?: boolean;
  noCss?: boolean;
  configuration?: string;
  outdir?: string;
  dir?: string;
}

export default function raven<T>({
  configuration = 'config.ts',
  outdir = 'dist',
  dir = '.',
  'no-css': noCss = false,
  'no-javascript': noJs = false,
  'no-scss': noScss = false,
  plugins: pluginsArg,
}: CliArgs<T>) {
  const args = [];
  // Testing this thing.
  console.info(configuration, outdir, dir, noCss, noJs, noScss);
}
