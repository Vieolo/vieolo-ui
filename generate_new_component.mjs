import * as fs from 'fs';
import { rewriteExports } from './export_rewrite.mjs';


function camelCaseToKebab(org) {
    let replaced = org.replace(/([A-Z])/g, " $1");
    return replaced.trim().toLowerCase().replace(/ /g, "_");
}

function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }


if (process.argv.length === 2) throw new Error('Please enter the name of the component to be geerated');

/**
 * @type string
 */
let compName = process.argv[2]

fs.mkdirSync(`./src/${compName}`)
fs.writeFileSync(`./src/${compName}/index.ts`, "");
fs.writeFileSync(`./src/${compName}/${camelCaseToKebab(compName)}.tsx`, `
export default function ${compName}(props: {}) {
    return <div></div>
}
`);

fs.writeFileSync(`./src/${compName}/${camelCaseToKebab(compName)}.view.tsx`, `
// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import ${compName} from './${camelCaseToKebab(compName)}';

// Types
import { ViewData } from '../view/main/main';

type ${compName}PropsType = React.ComponentProps<typeof ${compName}>;

export function ${lowerFirstLetter(compName)}Options(): ViewData {

    return {
        constants: {

        } as Partial<${compName}PropsType>,
        variables: {

        }
    }
}


export function ${compName}Creator(props: {p: ${compName}PropsType}) {

    return <${compName}

    />
}
`);
rewriteExports();