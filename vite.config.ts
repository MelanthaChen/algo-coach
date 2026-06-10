import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

function copyExtensionAssets(): Plugin {
  return {
    name: "copy-extension-assets",
    closeBundle() {
      mkdirSync("dist", { recursive: true });
      mkdirSync("dist/icons", { recursive: true });
      copyFileSync("extension/manifest.json", "dist/manifest.json");
      copyFileSync("public/ac-logo.svg", "dist/icons/ac-logo.svg");
      copyFileSync("public/icons/icon-16.png", "dist/icons/icon-16.png");
      copyFileSync("public/icons/icon-48.png", "dist/icons/icon-48.png");
      copyFileSync("public/icons/icon-128.png", "dist/icons/icon-128.png");
    }
  };
}

export default defineConfig({
  plugins: [react(), copyExtensionAssets()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, "extension/content.tsx"),
        background: resolve(__dirname, "extension/background.ts")
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "assets/[name][extname]"
      }
    }
  }
});
