import * as fs from "node:fs";

// Read package.json
export const packageJson = JSON.parse(fs.readFileSync("package.json", { encoding: "utf-8" }).toString());