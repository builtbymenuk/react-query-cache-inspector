// esbuild.js
const esbuild = require("esbuild");

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

/**
 * Simple plugin to log builds in watch mode
 */
const esbuildProblemMatcherPlugin = {
  name: "esbuild-problem-matcher",
  setup(build) {
    build.onStart(() => console.log("[watch] build started"));
    build.onEnd((result) => {
      if (result.errors.length) {
        for (const { text, location } of result.errors) {
          console.error(`✘ [ERROR] ${text}`);
          if (location)
            console.error(
              `    ${location.file}:${location.line}:${location.column}`
            );
        }
      }
      console.log("[watch] build finished");
    });
  },
};

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ["src/extension.ts"],
    bundle: true,
    format: "cjs",
    platform: "node",
    external: ["vscode"],
    outfile: "out/extension.js", // 👈 matches launch.json + tasks.json
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    logLevel: "silent",
    plugins: [esbuildProblemMatcherPlugin],
  });

  if (watch) await ctx.watch();
  else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
