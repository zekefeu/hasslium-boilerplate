import fs from "node:fs";
import path from "node:path";
import * as hasslium from "hasslium";
import chalk from "chalk";

// Add your files here
const files = ["main.js"];

// Macros
// Get the arguments from the CLI
// and put them in the processor
let argsArray = process.argv;

let startArgsArray = [];

// If there is an argument
if (argsArray.length > 2) {

	// Remove the executable path and the script path
	argsArray.shift();
	argsArray.shift();
	
	
	// Walk through the arguments and push them in startArgsArray
	argsArray.forEach(arg => {
		startArgsArray.push([arg.toUpperCase(), "1"]);
	});
}

const outFolder = "build/out/";

// Loop through the files
for (const file in files) {

	const filename = files[file];

	// Get the folder's path from the file name
	const folderPath = outFolder + path.dirname(filename);

	try {
		// Process the file
		hasslium.process(fs.readFileSync("build/ts/" + filename).toString().split("\n"), { macros: startArgsArray, verbose: false }, (error, output) => {
			if (error) {
				console.error(error);

				process.exit(1);
			} else {
				try {
					// Ensures the folder exists
					if (!fs.existsSync(folderPath)) {
						if (folderPath === outFolder + ".") {
							fs.mkdirSync(outFolder);
						} else {
							fs.mkdirSync(folderPath);
						}
					}

					// Write it to the output folder
					fs.writeFileSync("build/out/" + filename, output.join("\n"));

					console.log(chalk.green("✅ Done:"), chalk.grey(filename));
				} catch (err) {
					console.error(chalk.red("❌ Error:"), chalk.grey(filename));
					console.error(err);

					process.exit(1);
				}
			}
		});
	} catch (err) {
		console.error(err);

		process.exit(1);
	}
}

console.log();