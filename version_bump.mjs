import { execSync } from 'child_process';
import * as fs from 'fs';
import { rewriteExports } from './export_rewrite.mjs';
import path from 'path'

if (process.argv.length === 2) throw new Error('Please select add the bump level. The accepted options are "build", "minor", and "major"');

/**
 * @type {'build' | 'minor' | 'major'}
 */
let level = process.argv.slice(2).toString();

let packageJSON = JSON.parse(fs.readFileSync('./package.json').toString());

/** @type {number[]} */
let cv = packageJSON.version.split('.').map(a => parseInt(a));

if (level === 'build') {
    cv[2] += 1;
} else if (level === 'minor') {
    cv[2] = 0;
    cv[1] += 1;
} else {
    cv[2] = 0;
    cv[1] = 0;
    cv[0] += 1;
}

// Updated Version
let fv = cv.join('.');

console.log(`Bumping the version to ${fv}`);

packageJSON.version = fv;

// Writing the package.json
fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2));

// Updating the Version number of the `cypressTools`
let ctJSON = JSON.parse(fs.readFileSync('./cypressToolsSource/package.json').toString());
ctJSON.version = fv;
fs.writeFileSync('./cypressToolsSource/package.json', JSON.stringify(ctJSON, null, 2));

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
    `## v${fv} (${today()})`,
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

console.log(`Building The components`);

let tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json').toString());
tsConfig.compilerOptions.noEmit = false;
fs.writeFileSync('./tsconfig.json', JSON.stringify(tsConfig, null, 2));

// Rewriting the export files
console.log("Rewriting the export files")
rewriteExports();

// Removing the existing dist folder (both the main and the one for cypressTools)
fs.rmSync("./dist", { recursive: true, force: true });
fs.rmSync("./cypressToolsSource/dist", { recursive: true, force: true });

// Building the components
execSync('npm run build-components');
tsConfig.compilerOptions.noEmit = true;
fs.writeFileSync('./tsconfig.json', JSON.stringify(tsConfig, null, 2));

// Building the cypressTools and copy it in the dist folder
process.chdir("./cypressToolsSource")
execSync('npm run build');
process.chdir("..")
copyFolderRecursiveSync('./cypressToolsSource/dist', '.')
fs.renameSync('./dist', './cypressTools')


console.log('\x1b[32m', 'The package is successfully built' ,'\x1b[0m');

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


function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}