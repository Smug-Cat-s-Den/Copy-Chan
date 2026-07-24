// apps/web/copy-assets.js
import fs from "fs";
import path from "path";

// Resolve paths relative to apps/web
const rootAssets = path.resolve(process.cwd(), "../../assets");
const targetPub = path.resolve(process.cwd(), "public");

if (fs.existsSync(rootAssets)) {
  fs.cpSync(rootAssets, targetPub, { recursive: true, force: true });
  console.log("Successfully copied root assets to public folder!");
} else {
  console.warn("Root assets folder not found at:", rootAssets);
}
