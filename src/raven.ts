interface RavenArgs {
  noJavascript?: boolean;
  noScss?: boolean;
  noCss?: boolean;
  configuration?: string;
  outdir?: string;
  dir?: string;
}

export default function raven({
  noCss = false,
  noJavascript = false,
  noScss = false,
  configuration = 'config.ts',
  outdir = 'dist',
  dir = '.'
}: RavenArgs) {
  // Testing this thing.
  console.info(noCss,noJavascript,noScss,configuration,outdir,dir);
}