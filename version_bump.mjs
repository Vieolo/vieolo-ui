import { execSync } from 'child_process';
import * as fs from 'fs';

if (process.argv.length == 2) throw 'Please select add the bump level. The accepted options are "build", "minor", and "major"';

/**
 * @type {'build' | 'minor' | 'major'}
 */
let level = process.argv.slice(2);

let packageJSON = JSON.parse(fs.readFileSync('./package.json').toString());

/** @type {number[]} */
let cv = packageJSON.version.split('.').map(a => parseInt(a));

if (level == 'build') {
    cv[2] += 1;
} else if (level == 'minor') {
    cv[2] = 0;
    cv[1] += 1;
} else {
    cv[2] = 0;
    cv[1] = 0;
    cv[0] += 1;
}

// Updated Version
let fv = cv.join('.');

packageJSON.version = fv;

// Writing the package.json
fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));


// Updating the ReadMe file
let readMe = fs.readFileSync('./README.md').toString();
let readMeLines = readMe.split('\n');
/** @type {string[]} */
let readMeNewLines = [];

for (let i = 0; i < readMeLines.length; i++) {
    const line = readMeLines[i];
    if (line.includes(`"@vieolo/vieolo-ui": "github:Vieolo`)) {
        readMeNewLines.push(`"@vieolo/vieolo-ui": "github:Vieolo/vieolo-ui#${fv}"`)
    } else {
        readMeNewLines.push(line);
    }
}

fs.writeFileSync('./README.md', readMeNewLines.join('\n'));


// Adding lines to the Change Log
let changelog = fs.readFileSync('./changelog.md').toString();
let changeLogLines = changelog.split('\n').slice(1);

changeLogLines.unshift(...[
    "# Change Log",
    "",
    `## ${fv} (${today()})`,
    "- TODO: add the changes",
    "",
    "#### Deprecation",
    "- (Optional) deprecations in this version",
    "",
    "#### Breaking Changes",
    "- (Optional) breaking changes in this version"
])
fs.writeFileSync('./changelog.md', changeLogLines.join('\n'));



// Creating a build ************

// Setting the tsconfig's noEmit to false

let tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json').toString());
tsConfig.compilerOptions.noEmit = false;
fs.writeFileSync('./tsconfig.json', JSON.stringify(tsConfig, null, 2));

execSync('npm run build-components');


tsConfig.compilerOptions.noEmit = true;
fs.writeFileSync('./tsconfig.json', JSON.stringify(tsConfig, null, 2));


/**
 * @returns {string}
 */
function today() {
    let t = new Date();

    let y = t.getFullYear();
    let m = t.getMonth() + 1;
    let d = t.getDate();

    return `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
}

