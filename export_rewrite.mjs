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
        .filter(z => z.length > 0 && z.includes("export") && !z.includes("// internal"))
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
    let im = [];
    let e = [];

    if (ex.default) {
        im.push(`import ${ex.default} from './${ex.fileName.split(".")[0]}';`);
        e.push(`export default ${ex.default};`);
    }

    if (ex.nonDefault.length > 0) {
        e.push("export {");
        for (let i = 0; i < ex.nonDefault.length; i++) {
            const nd = ex.nonDefault[i];
            e.push(`\t${nd},`)
        }
        e.push(`} from './${ex.fileName.split(".")[0]}'`);
    }

    if (ex.types.length > 0) {
        im.push('import {')
        for (let i = 0; i < ex.types.length; i++) {
            const t = ex.types[i];
            im.push(`\t${t} as ${t}Temp,`)
        }
        im.push(`} from './${ex.fileName.split(".")[0]}';`);
        
        for (let i = 0; i < ex.types.length; i++) {
            const t = ex.types[i];
            e.push(`export type ${t} = ${t}Temp;`)
        }
    }

    return [...im, "\n", ...e].join("\n");
}

/**
 * @param {FileExport[]} exs 
 * @return {string}
 */
function prepareMainExport(exs) {
    let im = [];
    let ex = [];

    let toBeExported = []

    im.push("// Imports")
    
    for (let i = 0; i < exs.length; i++) {
        const d = exs[i];
        let hasDefault = d.default.length > 0;
        let hasNonDefault = d.nonDefault.length > 0;
        let hasBoth = hasDefault && hasNonDefault;        
        if (!hasDefault && !hasNonDefault) continue;
        let importObj = `${!hasDefault ? "" : d.default + " "}${hasBoth ? ", " : ""}${hasNonDefault ? "{ " + d.nonDefault.join(", ") + " }" : ""}`.trim().replace(/  +/g, " ");
        im.push(`import ${importObj} from './${d.folderName}';`);
        toBeExported.push(d.default, ...d.nonDefault)
    }    

    ex.push("export {");
    for (let i = 0; i < toBeExported.length; i++) {
        const d = toBeExported[i];
        ex.push(`\t${d},`);
    }
    ex.push("}");
    
    ex.push("\n\n");
    
    for (let i = 0; i < exs.length; i++) {
        const d = exs[i];
        if (d.types.length === 0) continue;

        im.push("import {");
        for (let k = 0; k < d.types.length; k++) {
            const t = d.types[k];
            im.push(`\t${t} as ${t}Temp,`)
        }
        im.push(`} from './${d.folderName}';`);
        
        for (let k = 0; k < d.types.length; k++) {
            const t = d.types[k];
            ex.push(`export type ${t} = ${t}Temp;`)
        }
    }
    
    return [...im, "\n", ...ex].join("\n");
}


export function rewriteExports() {
    // let s = fs
    //     .readFileSync("./src/DateInput/date_input.tsx")
    //     .toString()

    let s = fs.readdirSync('./src/')

    let unwanted = ["private", "hooks", "icons", "utility", "view"];

    /** @type FileExport[] */
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
                    if (!f.includes(".tsx") || f === "index.ts" || f === "index.tsx" || f.includes(".test.ts") || f.includes(".view.tsx")) continue;

                    folderEx = getFileExports(o, f);

                }

                let prepared = prepareIndexExports(folderEx);
                fs.writeFileSync(`./src/${o}/index.ts`, prepared)

                allEx.push(folderEx);
            }
        }
    }
        
    fs.writeFileSync(`./src/export.ts`, prepareMainExport(allEx));
}