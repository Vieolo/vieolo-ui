# Change Log

## 0.19.5 (2022-03-23)
- Improved the `width` and `height` CSS classes
- Added `withAndHeightSize` type
- Added `Divider` Component ([#133](https://github.com/Vieolo/vieolo-ui/issues/133))
- Added `Spacer` Component ([#134](https://github.com/Vieolo/vieolo-ui/issues/134))
- Added `TitlePeriodCard` Component ([#135](https://github.com/Vieolo/vieolo-ui/issues/135))

## 0.19.4 (2022-03-22)
- Added the ability to reorder the rows of `Table` ([#131](https://github.com/Vieolo/vieolo-ui/issues/131))

## 0.19.3 (2022-03-21)
- Added `content-background-color` variable to SCSS. This variable is used as background for none and low emphasis

## 0.19.2 (2022-03-21)
- Fixed the background and border color of the none and low emphasis

## 0.19.1 (2022-03-19)
- Added `GridTwo` and `GridThree` to the export

## 0.19.0 (2022-03-19)
- Added `Card` ([#60](https://github.com/Vieolo/vieolo-ui/issues/60))
- Added `GridContainer` ([#122](https://github.com/Vieolo/vieolo-ui/issues/122))
- Added `GridTwo` component ([#124](https://github.com/Vieolo/vieolo-ui/issues/124))
- Added `GridThree` component ([#125](https://github.com/Vieolo/vieolo-ui/issues/125))
- Added `!default` to SCSS variables ([#119](https://github.com/Vieolo/vieolo-ui/issues/119))
- Fixed the default border radius CSS class for `Button`
- Added `colorType` to `Typography`
- Made the title of the `List` optional
- Added `ExpandableCard` ([#16](https://github.com/Vieolo/vieolo-ui/issues/16))
- Added grouping capability to `List` ([#126](https://github.com/Vieolo/vieolo-ui/issues/126))

#### Deprecation
- The following SCSS variable are deprecated in favor of `Elevation` class:
    - `box-shadow`
    - `box-shadow-dark`
    - `reverse-box-shadow`
- The following CSS classes are deprecated in favor of `Grid` component:
    - `.grid`
    - `.grid-two-column`
    - `.grid-three-column`
- The following CSS classes are deprecated in favor of `Card` component:
    - `.card-light-shadow`
    - `.card-dark-shadow`
    - `.card-no-shadow`
    - `.card-selectable`
    - `.card-selectable`
    - `.card-selectable-gradient`
    - `.card-header`
    - `.card-button-footer`

#### Breaking Changes
- The `Grid` component is rewritten ([#123](https://github.com/Vieolo/vieolo-ui/issues/123))
- Replaced the card style with `RowStyleType` in `ItemRow` and `List`
- Removed the `ItemRowSearch` in favor of `ItemRow`


## 0.18.2 (2022-03-13)
- The following props are added to all `Typography` components:
    - `color` ([#114](https://github.com/Vieolo/vieolo-ui/issues/114))
    - `margin` ([#115](https://github.com/Vieolo/vieolo-ui/issues/115))
    - `fontWeight` ([#116](https://github.com/Vieolo/vieolo-ui/issues/116))
    - `style` ([#118](https://github.com/Vieolo/vieolo-ui/issues/118))
- The following classes are added to the base CSS:
    - `default-text-color`
    - `gray-text-color`
    - `font-weight--*`

#### Deprecation
- The following SCSS variables are deprecated:
    - `paragraph-font-family`
    - `paragraph-font-light-weight`
    - `paragraph-font-regular-weight`
    - `header-font-family`
    - `header-font-bold-weight`
    - 
    - Replaced by:
    - `font-weight-light`
    - `font-weight-normal`
    - `font-weight-bold`
    - `font-weight-extra-bold`
    - `font-family-primary`
    - `font-family-secondary`

## 0.18.1 (2022-03-08)
- Added border radius option to `Chip` ([#109](https://github.com/Vieolo/vieolo-ui/issues/109))
- Added emphasis option to `Chip` ([#108](https://github.com/Vieolo/vieolo-ui/issues/108))
- Fixed the default border radius of `IconButton` ([#110](https://github.com/Vieolo/vieolo-ui/issues/110))

## 0.18.0 (2022-03-07)

#### Breaking Changes
- The return value of `onItemResize` function of `GanttChart` is converetd into a promise

## 0.17.3 (2022-03-07)
- Added accept response to the resize callback of items in `GanttChart` ([#106](https://github.com/Vieolo/vieolo-ui/issues/106))

## 0.17.2 (2022-03-07)
- Added resizing of the items to the `GanttChart` for
    - Allowing items to overlap ([#104](https://github.com/Vieolo/vieolo-ui/issues/104))
    - Preventing items to overlap ([#103](https://github.com/Vieolo/vieolo-ui/issues/103))
    - Fixed increment of the resize ([#105](https://github.com/Vieolo/vieolo-ui/issues/105))
- Moved the drag handle from the entire row to the row title cell in `GanttChart`
- Fixed the position of drop zone in `GanttChart` in Chrome and Firefox
- Fixed the propagation of dropdown menu button [#102](https://github.com/Vieolo/vieolo-ui/issues/102)

## 0.17.1 (2022-03-04)
- Export the `GanttChartAuxiliaryItemType` ([#99](https://github.com/Vieolo/vieolo-ui/issues/99))
- Added color indicator for the rows in `GanttChart` ([#100](https://github.com/Vieolo/vieolo-ui/issues/100))

## 0.17.0 (2022-03-04)
- Added item reordering in `GanttChart` ([#98](https://github.com/Vieolo/vieolo-ui/issues/98))

#### Breaking Changes
- Moved the sub and sup items from the items to rows in `GanttChart` ([#96](https://github.com/Vieolo/vieolo-ui/issues/96))

## 0.16.3 (2022-02-28)
- Added the ability to ignore items while filtering in `GanttChart` ([#93](https://github.com/Vieolo/vieolo-ui/issues/93))
- Added aria label to sub and sup items in `GanttChart` ([#94](https://github.com/Vieolo/vieolo-ui/issues/94))
- Fixed the touch events for iPad and iPhones in `GanttChart` ([#95](https://github.com/Vieolo/vieolo-ui/issues/95))

## 0.16.2 (2022-02-24)
- Fixed the overflow style of the main in `useAppearingContainer` hook

## 0.16.1 (2022-02-24)
- Fixed the bar start and end style of the `GanttChart`

## 0.16.0 (2022-02-23)
- Added touch support for the `GanttChart` items
- Added context menu for the `GanttChart` row titles ([#92](https://github.com/Vieolo/vieolo-ui/issues/92))

#### Breaking Changes
- `GanttChartDataType` is renamed to `GanttChartRowType`
- `GanttChartContextMenuItem`'s `onClick` signature is changed to contain the selected row as well.

## 0.15.4 (2022-02-21)
- Added aria accessibility to the `GanttChart`
- Added aria accessibility to the `ContextMenu`
- Added aria accessibility to the `ConfirmationDialog`
- Added aria accessibility to the `FormDialog`

## 0.15.3 (2022-02-17)
- Added dedicated aria accessibility for the `DateTimePicker` ([#89](https://github.com/Vieolo/vieolo-ui/issues/89))
- Added aria accessibility and data test ID for all `Typography` components ([#90](https://github.com/Vieolo/vieolo-ui/issues/90))
- Added aria accessibility for the `Table` ([#91](https://github.com/Vieolo/vieolo-ui/issues/91))

## 0.15.2 (2022-02-03)
- Added aria accessibility for the `DatePicler`
- Improved the style of the default button of `DatePicker`

## 0.15.1 (2022-01-29)
- Uniformed the style of the label of `DateTimePicker` with the rest of components
- Fixed the persistence of date search input in `DatePicker` ([#87](https://github.com/Vieolo/vieolo-ui/issues/87))

## 0.15.0 (2022-01-29)
- Added `DateInput` component
- Added aria accessibility to the `DateTimeInput` ([#86](https://github.com/Vieolo/vieolo-ui/issues/86))
- Improved the style of the label for `DateTimeInput` ([#85](https://github.com/Vieolo/vieolo-ui/issues/85))
- Added Keyboard accessibility for `DatePicker` ([#73](https://github.com/Vieolo/vieolo-ui/issues/73))

#### Breaking Changes
- Renamed the `TimePicker` component to `TimeInput`

## 0.14.3 (2022-01-28)
- Added `DateTimePicker` component
- Added subtitle search for `List` ([#84](https://github.com/Vieolo/vieolo-ui/issues/84))

## 0.14.2 (2022-01-08)
- Added extra small size to `IconButton` ([#77](https://github.com/Vieolo/vieolo-ui/issues/77))
- Added aria label to `IconButton` ([#78](https://github.com/Vieolo/vieolo-ui/issues/78))
- Added aria label to `Button` ([#79](https://github.com/Vieolo/vieolo-ui/issues/79))
- Added aria label to `Input` ([#80](https://github.com/Vieolo/vieolo-ui/issues/80))
- Added aria label to `Textarea` ([#81](https://github.com/Vieolo/vieolo-ui/issues/81))
- Added aria accessibility attributes to `Select` ([#82](https://github.com/Vieolo/vieolo-ui/issues/82))
- Fixed the key of the `Select` items ([#83](https://github.com/Vieolo/vieolo-ui/issues/83))

## 0.14.1 (2022-01-02)
- `FileInput` now displays the text along with icons ([#56](https://github.com/Vieolo/vieolo-ui/issues/56))
- `FileInput` now enforces the file type in drag and drop ([#57](https://github.com/Vieolo/vieolo-ui/issues/57))

## 0.14.0 (2021-12-31)
- Added `Checkbox` Component
- Added disable to the `Input` ([#72](https://github.com/Vieolo/vieolo-ui/issues/72))
- Added check functionality to `Table` ([#40](https://github.com/Vieolo/vieolo-ui/issues/40))

#### Breaking Changes
- Changed the row prop of the `Table` from `React.ReactNode[][]` to `TableRow`

## 0.13.5 (2021-12-29)
- Added `ContextMenu` Component
- Added `GanttChart` Component ([#18](https://github.com/Vieolo/vieolo-ui/issues/18))
- Added `BarChart` Component ([#19](https://github.com/Vieolo/vieolo-ui/issues/19))

## 0.13.4 (2021-12-23)
- Added `DatePicker` component

## 0.13.3 (2021-12-10)
- Added `ConfirmationDialog` to the export

## 0.13.2 (2021-12-10)
- Added `ConfirmationDialog` component
- Fixed the keyboard accessibility of `SwitchSet` when disabled ([#69](https://github.com/Vieolo/vieolo-ui/issues/69))
- `SwitchSet` now accepts custom components as well as strings for title and subtitle ([#59](https://github.com/Vieolo/vieolo-ui/issues/59))

## 0.13.1 (2021-12-07)
- Improved the keyboard accessibility for `Select`

## 0.13.0 (2021-12-07)
- Added emphasis for the buttons in `FormDialog` ([#68](https://github.com/Vieolo/vieolo-ui/issues/68))
- Added disabled option for the items in `List` ([#67](https://github.com/Vieolo/vieolo-ui/issues/67))
- Improved click functionality on `Select` ([#66](https://github.com/Vieolo/vieolo-ui/issues/66))
- Added keyboard accessibility for `Select` ([#38](https://github.com/Vieolo/vieolo-ui/issues/38))
- Added keyboard accessibility for `SwitchSet` ([#37](https://github.com/Vieolo/vieolo-ui/issues/37))

#### Breaking Changes
- Changed the button configuration and their relevant types for `FormDialog`

## 0.12.0 (2021-11-25)
- Added auxiliary button to `Button` ([#65](https://github.com/Vieolo/vieolo-ui/issues/65))
- Added optional type to `IconButton` ([#61](https://github.com/Vieolo/vieolo-ui/issues/61))
- Added height control to `Select` ([#62](https://github.com/Vieolo/vieolo-ui/issues/62))
- Improved the display of categories in `Select` ([#64](https://github.com/Vieolo/vieolo-ui/issues/64))
- Added `TabSwitch` component ([#63](https://github.com/Vieolo/vieolo-ui/issues/63))

#### Breaking Changes
- `DropDownMenu` items now require a unique value

## 0.11.0 (2021-11-17)
- Added basis of the Vieolo design language
- Added `half`, `one`, and `two` states to `margin` and `padding` CSS classes
- Added directional states to `margin` and `padding` CSS classes
- Added new `border-radius` variables
- Added `border` CSS class
- Improved the style of the `IconButton`
- Improved the style of the `Button`
- Added `Grid` Component

#### Deprecation
- `universal-border-radius` CSS variable is deprecated in favor of `border-radius-normal`
- `ripple-{color}` CSS classes are deprecated in favor of `ripple` class
- `hover-{color}` CSS classes are deprecated in favor of `hover` class 

#### Breaking Changes
- `border-radius--full` CSS class has a different value (2BU). use `border-radius--normal` for the old value
- `Button`'s `fullWidth` prop is replaced with `width`
- `Button`'s `size` prop is replaced with `height`
- `Button`'s `variant` prop is replaced with `emphasis`

## 0.10.11 (2021-11-03)

- Exported the `Typography` components

## 0.10.10 (2021-10-24)

- Fixed the next button of pagination of `Table`

## 0.10.9 (2021-10-24)

- Added sticky header to the `Table` ([#41](https://github.com/Vieolo/vieolo-ui/issues/41))
- Improved the generic CSS classes ([#26](https://github.com/Vieolo/vieolo-ui/issues/26))
- Replaced the Material UI v4 with v5
- Added pagination to the `Table` ([#42](https://github.com/Vieolo/vieolo-ui/issues/42))
- Added dense layout to the `Table`
- Improved the hover and ripple color of buttons ([#54](https://github.com/Vieolo/vieolo-ui/issues/54))

#### Deprecation
- The `removeHeaderRow` prop of the `Table` has been deprecated. The `headers` props is not optional, omitting which will result in a table without the header row.

## 0.10.8 (2021-10-02)

- Added `RadioGroup` component ([#50](https://github.com/Vieolo/vieolo-ui/issues/50))
- Added `preValidationNameEditor` function to the `FileInput`

## 0.10.7 (2021-10-02)

- Added ability to remove the header row of the table ([#49](https://github.com/Vieolo/vieolo-ui/issues/49))

## 0.10.6 (2021-09-29)

- Fixed the `onRowClick` of `Table` ([#48](https://github.com/Vieolo/vieolo-ui/issues/48))
- Fixed the key error of the rows of `Table` ([#47](https://github.com/Vieolo/vieolo-ui/issues/47))

## 0.10.5 (2021-09-28)

- Added `Table` Component
- Added `FormDialog` Component
- Fixed the rendition of PDF files with pre-existing rotations ([#36](https://github.com/Vieolo/vieolo-ui/issues/36))
- Fixed the CSS class name of `list` component ([#33](https://github.com/Vieolo/vieolo-ui/issues/33))
- Added Typography to the `ItemRow` ([#35](https://github.com/Vieolo/vieolo-ui/issues/35))

## 0.10.4 (2021-09-24)

- Added `List` component
- Exported `ItemRow` and `ItemRowSearch` components
- Exported `PeriodOptions` enum

## 0.10.3 (2021-09-23)

- Added `PeriodSelector` component
- Changed the `p` tags of `SwitchSet` with `Typography` components

## 0.10.2 (2021-09-22)

- Fixed the `dropdown` class of the `dropdownmenu`

## 0.10.1 (2021-09-21)

- Fixed the overflow of `main` while using `DropDownMenu` and `Select`
- Changed the dropdown of `DropDownMenu` and `Select` to have a fixed position

#### Deprecation
- The `position` prop of the `DropDownMenu` has been deprecated. The position of the drop down is calculated automatically.

## 0.10.0 (2021-09-16)

- Added `PDFViewer`
- Fixed the division bug in the SCSS file
- Added `width` and `height` utility classes

## 0.9.0 (2021-07-13)

- Improved the style of DropDownMenu
- Added position to the DropDownMenu (default: `left`)

#### Breaking Changes
- Fixed the typo of `onItemSelec` to `onItemSelect` in the DropDownMenu

## 0.8.3 (2021-07-01)

- Moved react-scripts, webvitals, and node-sass to dev dependencies


## 0.8.2 (2021-06-19)

- Added action button to the `InputSet`


## 0.8.1 (2021-06-03)

- Fixed the `uesEffect` error of `Select`


## 0.8.0 (2021-06-03)

- Added `searchable`, `clearable`, and `multipleChoice` functionalities to `Select`
- Added `ItemRow` component
- Added Typography components and classes

#### Breaking Changes
- Changed the `selectedItem` prop of `Select` from `string` to `string[]` 
- Changed the `tertiary-color` values