## Release
In order to build the release components, run
```
npm run build-components
```
which uses typescript compiler to create release components in the main folder. The component source files are in `src/lib` and are exported in `src/export.ts` file. 


If the `build-components` command does not produce any file, check the `noEmit` key in the `tsconfig.json` file.