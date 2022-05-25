import * as fs from "node:fs";
import * as path from "node:path";
import * as hasslium from "hasslium";

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

// Add your files here
const files = ["main.js"];

const outFolder = "build/out/";

// Loop through the files
for (const file in files) {

	// Get 
	const filename = files[file];

	// Get the folder's path from the file name
	const folderPath = outFolder + path.dirname(filename);

	try {
		// Process the file
		hasslium.process(fs.readFileSync("build/ts/" + filename).toString().split("\n"), { macros: startArgsArray, verbose: false }, (error, output) => {
			if (error) {
				console.error(error);
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

					console.log("=== DONE:", filename);
				} catch (err) {
					console.error("=== ERROR:", filename);
					console.error(err);
				}
			}
		});
	} catch (err) {
		console.error(err);
	}
}

console.log("\n");