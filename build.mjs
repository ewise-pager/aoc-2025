import { build, context } from 'esbuild';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  target: 'node25',
  format: 'esm',
  outfile: 'dist/bundle.js',
  sourcemap: true,
};

if (isWatch) {
  const ctx = await context(buildOptions);
  await ctx.watch();
  console.log('👀 Watching for changes...');
} else {
  await build(buildOptions).catch(() => process.exit(1));
  console.log('✓ Build complete');
}

