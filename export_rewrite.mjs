import * as fs from 'fs';

/**
 * @typedef FileExport
 * @property {string} fileName
 * @property {string} folderName
 * @property {string} default
 * @property {string[]} nonDefault
 * @property {string[]} types
 */

/**
 * @param {string} folderName 
 * @param {string} fileName
 * @return {FileExport}
 */
function getFileExports(folderName, fileName) {

    /** @type FileExport */
    let ex = {
        default: '',
        nonDefault: [],
        types: [],
        fileName: fileName,
        folderName: folderName
    }

    /**
     * @type string[]
     */
    let el = fs
        .readFileSync(`./src/${folderName}/${fileName}`)
        .toString()
        .replace(/\t+/g, "")
        .split("\n")
        .filter(z => z.length > 0 && z.includes("export"))
        .map(z => {
            z = z.split("(")[0];
            z = z.split("{")[0];
            z = z.split("=")[0];
            return z.trim();
        });

    for (let i = 0; i < el.length; i++) {
        const e = el[i];
        let n = (e.split(" ").slice(-1)[0] || '').trim();
        if (e.includes(" default ")) {
            ex.default = n;
        } else if (e.includes(" type ")) {
            ex.types.push(n)
        } else {
            ex.nonDefault.push(n)
        }
    }

    return ex
}


/**
 * @param {FileExport} ex 
 * @return {string}
 */
function prepareIndexExports(ex) {
    let s = [];

    if (ex.default) {
        s.push(`import ${ex.default} from './${ex.fileName.split(".")[0]}';`);
        s.push(`export default ${ex.default};`);
    }

    if (ex.nonDefault.length > 0) {
        s.push("export {");
        for (let i = 0; i < ex.nonDefault.length; i++) {
            const nd = ex.nonDefault[i];
            s.push(`\t${nd},`)
        }
        s.push("}");
    }

    if (ex.types.length > 0) {
        s.push('import {')
        for (let i = 0; i < ex.types.length; i++) {
            const t = ex.types[i];
            s.push(`\t${t} as ${t}Temp,`)
        }
        s.push(`} from './${ex.fileName.split(".")[0]}';`);
        s.push(" ");
        for (let i = 0; i < ex.types.length; i++) {
            const t = ex.types[i];
            s.push(`export type ${t} = ${t}Temp;`)
        }
    }

    return s.join("\n");
}


export function rewriteExports() {
    // let s = fs
    //     .readFileSync("./src/DateInput/date_input.tsx")
    //     .toString()

    let s = fs.readdirSync('./src/')

    let unwanted = ["private", "hooks", "icons", "utility", "view"];

    /** @type string[] */
    let allEx = []
    
    for (let i = 0; i < s.length; i++) {
        const o = s[i];
        let isDir = !o.includes(".")
        
        if (isDir) {
            if (unwanted.includes(o)) continue;
            else {
                let files = fs.readdirSync(`./src/${o}/`);

                /** @type FileExport */
                let folderEx = {}

                for (let k = 0; k < files.length; k++) {
                    const f = files[k];
                    if (f === "index.ts" || f === "index.tsx" || f.includes(".test.ts")) continue;

                    folderEx = getFileExports(o, f);

                }

                let prepared = prepareIndexExports(folderEx);
                fs.writeFileSync(`./src/${o}.index.ts`, prepared)

                allEx.push(
                    `// ${o}/${folderEx.fileName}`,
                    prepared
                );
            }
        }
    }
        
    fs.writeFileSync(`./src/export.ts`, allEx.join("\n"));
}

rewriteExports();