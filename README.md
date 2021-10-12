# Vieolo UI
The component package containing the UI components of Vieolo OÜ

## Install
to install, add the following to the `dependency` key of the `package.json` file of the project.

```json
"@vieolo/vieolo-ui": "github:Vieolo/vieolo-ui#0.10.8"
```

## Development View
In order to develop the components, run
```
npm start
```
which starts the development server. The components are displayed in the `App.tsx` and can be developed with the hot reload functionality.

## Release
In order to build the release components, run
```
npm run build-components
```
which uses typescript compiler to create release components in the `dist` folder. The component source files are in `src/lib` and are exported in `src/export.ts` file. If the `build-components` command does not produce any file, check the `noEmit` key in the `tsconfig.json` file.

## Usage
In the target package, the components can be imported and used as followed:
```JS
import { IconButton, Button } from '@vieolo/vieolo-ui'
```

## Version Bump
While bumping the version, the following files should be modified:
- package.json
- changelog.md (The user-facing change log for the user)
- README.md (The version of the installation key-value pair)