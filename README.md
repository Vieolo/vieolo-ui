# Vieolo UI
The UI package for front-end applications using React.

## Goals
1. Providing a complete set of UI components that are required to create a full-blown front-end application with all the batteries included, with stable, responsive, accessible, and optimized components.
2. Easy setup in a target project while allowing the implementer to modify every aspect of the design of every component using SCSS
3. Removing the need to create a custom CSS class for a new component/layout. Most of custom components/layouts should be achievable with a combination of differenet VUI components without leaving the `.tsx` file.

## Install
to install, add the following to the `dependency` key of the `package.json` file of the project.

```json
"@vieolo/vieolo-ui": "github:Vieolo/vieolo-ui#0.23.5"
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

## Components

[`BarChart`](src/BarChart/BarChart.md)

## Usage
(Recommended)

Components can be imported individually. This type of import will produce the smallest build size after the tree shaking
```js
import IconButton from '@vieolo/vieolo-ui/dist/IconButton'
```

(Not Recommended)
Components can also be imported in the following manner. This way, however, may result in an extremely large build size as the tree shaking may fail.
```JS
import { IconButton, Button } from '@vieolo/vieolo-ui'
```

## Version Bump
While bumping the version, the following files should be modified:
- package.json
- changelog.md (The user-facing change log for the user)
- README.md (The version of the installation key-value pair)


# Design Principles


## Base Unit
Base unit (default: `10px`) is the base value used to create a uniform and consistent design and experience. All of the designs should use the base unit to measure and size different components.<br/>
The `base-unit-half` value is the base unit divided by two.

## Margins and Paddings
The margins between the columns, cards, and components should be kept at one base unit as much as practically possible. The margin between buttons, however, should be kept at half a unit.<br>
The padding of the rows and cards, should be kept at either one base unit or half a unit.

## Row Height
Row height is the standardization of horizontally long components (such as table rows, bars, buttons, etc.) to create a consistent design with minimum effort. There are four different heights:
- `small`: equal to 3 base units
- `medium`: equal to 4 base units
- `large`: equal to 5 base units
- `over`: equal to 7 base units

<br />
The child components of these components should ideally be one unit smaller. For example, if a row has a `medium` height, the button inside should have a `small` height.

## Border Radius
There are three border radius measurements defined.
- `half`: equal to half a unit
- `normal`: equal to 1 base unit
- `full`: equal to 2 base units

## Color Pallet
There are 3 main colors, 3 utility colors, and 3 accessory colors. The names of the colors are:
- `primary` (main)
- `secondary` (main)
- `tertiary` (main)
- `alert` (Utility)
- `error` (Utility)
- `success` (Utility)
- `accessory-green` (Accessory)
- `accessory-orange` (Accessory)
- `accessory-blue` (Accessory)

<br/>
<br/>

Each color should have these variations:
- `normal`: The normal color
- `light`: The lighter version of the normal, should not be a totally different color.
- `transparent`: Similar to light variation, but is transparent.
- `text`: The color of text when the background color is `normal`
- `gradient` A gradient variant