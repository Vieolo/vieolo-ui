# Change Log

## 0.23.12 (2022-09-26)
- Improved the content type detection of the `FileViewer`

## 0.23.11 (2022-09-25)
- Added `FileViewerFrame` component
- Added file frame for `VideoViewer` ([#235](https://github.com/Vieolo/vieolo-ui/issues/234))
- Added file frame for `ImageViewer` ([#235](https://github.com/Vieolo/vieolo-ui/issues/235))
- Improved the download of file in `FileViewer` ([#237](https://github.com/Vieolo/vieolo-ui/issues/237))

## 0.23.10 (2022-09-12)
- Added aria label to `RadioGroup` items ([#229](https://github.com/Vieolo/vieolo-ui/issues/229))
- Fixed the children of `FormSection` ([#239](https://github.com/Vieolo/vieolo-ui/issues/239))
- Added aria label to `SwitchSet` ([#240](https://github.com/Vieolo/vieolo-ui/issues/240))
- Added aria label to `Chip` ([#241](https://github.com/Vieolo/vieolo-ui/issues/241))
- Fixed propagation of `Select` clear button ([#244](https://github.com/Vieolo/vieolo-ui/issues/244))
- Fixed propagation of `ItemRow` ([#245](https://github.com/Vieolo/vieolo-ui/issues/245))

## 0.23.9 (2022-09-03)
- Adjusted the `FileViewer` for `binary/octet-stream` content type

## 0.23.8 (2022-09-03)
- Added `VideoViewer` component
- Added `ImageViewer` component
- Added `FileViewer` component ([#231](https://github.com/Vieolo/vieolo-ui/issues/231))

## 0.23.7 (2022-08-30)
- Improved the emphasis options of `ExpandableCard` ([#218](https://github.com/Vieolo/vieolo-ui/issues/218))
- Fixed the display of multiple actions in `ExpandableCard` ([#225](https://github.com/Vieolo/vieolo-ui/issues/225))
- Improved the accessibility of `PeriodSelector` ([#228](https://github.com/Vieolo/vieolo-ui/issues/228))

## 0.23.6 (2022-08-28)
- Added `DoubleToggleList` component ([#132](https://github.com/Vieolo/vieolo-ui/issues/132))
- Added `SubDashboard` component
- Fixed propagation of `Chip` ([#216](https://github.com/Vieolo/vieolo-ui/issues/216))

## 0.23.5 (2022-08-26)
- Added weekday to the day period of `PeriodSelector`
- Changed the display of title of the `List` ([#219](https://github.com/Vieolo/vieolo-ui/issues/219))
- Added action buttons to the `List` ([#221](https://github.com/Vieolo/vieolo-ui/issues/221))
- Added managed border radius mode to the `List` ([#223](https://github.com/Vieolo/vieolo-ui/issues/223))

## 0.23.4 (2022-08-09)
- Fixed the keyboard interaction of `Select` when disabled ([#191](https://github.com/Vieolo/vieolo-ui/issues/191))
- Added title to the auxiliary items of `GanttChart` ([#202](https://github.com/Vieolo/vieolo-ui/issues/202))
- Fixed the aria label of buttons of `FormDialog` ([#211](https://github.com/Vieolo/vieolo-ui/issues/211))

## 0.23.3 (2022-07-30)
- Fixed the color range of `DonutChart`

## 0.23.2 (2022-07-30)
- Fixed the rendition of `DonutChart` when passed an empty array

## 0.23.1 (2022-07-30)
- Fixed the re-render of the `BarChart`
- Re-wrote the `DonutChart`
- Added extra-small size to `Button`
- Improved the color styles of `ClickableCard`
- Added thickness and padding to `Divider`
- Improved the style of `Select`
- Added `ActionCard` component

## 0.23.0 (2022-07-24)
- Improved the `BarChart`
- Added `Stacked` and `Grouped` types to the `BarChart`

#### Breaking Changes
- `color` field of the `BarChartData` is changed from string to the Vieolo UI color pallet
- `dataAxisMin` prop is removed from `BarChart`

## 0.22.11 (2022-07-18)
- Added height option to `Chip` ([#178](https://github.com/Vieolo/vieolo-ui/issues/178))
- Added loading state to `FormDialog` ([#203](https://github.com/Vieolo/vieolo-ui/issues/203))

## 0.22.10 (2022-07-18)
- Added wrap to the `Flex`

## 0.22.9 (2022-07-15)
- Fixed the propagation of the `DropDownMenu` item

## 0.22.8 (2022-07-03)
- Added optional property to `TimeInput`

## 0.22.7 (2022-07-03)
- Fixed the propagation of the `ExpandableCard`

## 0.22.6 (2022-07-02)
- Fixed the z-index of `Navbar`

## 0.22.5 (2022-06-28)
- Updated dependencies

## 0.22.4 (2022-06-27)
- Fixed the back functionality of `SubNavbarRow`

## 0.22.3 (2022-06-27)
- Added `Navbar` Component
- Added `NavDrawer` Component
- Added `SubNavbarRow` Component
- Added `Page` Component
- Added `PageFrame` Component
- Added `VieoloApp` Component
- Added `low-normal` and `none-normal` to emphasis types

## 0.22.2 (2022-06-26)
- Added `FormSection` ([#17](https://github.com/Vieolo/vieolo-ui/issues/17))
- Added `DonutChart` ([#20](https://github.com/Vieolo/vieolo-ui/issues/20))
- Added typography type to `Table` header ([#187](https://github.com/Vieolo/vieolo-ui/issues/187))
- Added support for custom component in `Table` header ([#188](https://github.com/Vieolo/vieolo-ui/issues/188))

## 0.22.1 (2022-06-22)
- Added the `RadioGroupSet` component ([#51](https://github.com/Vieolo/vieolo-ui/issues/51))
- Fixed the position of checkbox in `Table` header ([#76](https://github.com/Vieolo/vieolo-ui/issues/76))
- Added the `SelectSet` component ([#129](https://github.com/Vieolo/vieolo-ui/issues/129))

## 0.22.0 (2022-06-21)

#### Breaking Changes
- The individual import path for Components is changed to `import D from '@vieolo/vieolo-ui/dist/D` ([#180](https://github.com/Vieolo/vieolo-ui/issues/180));
- The default name of `ConfirmationDialog` is fixed

## 0.21.7 (2022-06-19)
- Added keyboard interaction for `DropdownMenu` ([#39](https://github.com/Vieolo/vieolo-ui/issues/39))
- Added keyboard interaction for `RadioGroupSet` ([#52](https://github.com/Vieolo/vieolo-ui/issues/52))
- Added mobile layout for `DatePicker` ([#74](https://github.com/Vieolo/vieolo-ui/issues/74))
- Added mobile layout for `Select` ([#75](https://github.com/Vieolo/vieolo-ui/issues/75))
- Made `TabSwitch` responsive ([#140](https://github.com/Vieolo/vieolo-ui/issues/140))
- Added ability to open only one group in `List` ([#153](https://github.com/Vieolo/vieolo-ui/issues/153))

## 0.21.6 (2022-06-13)
- Fixed the propagation of selecting week in `DatePicker`

## 0.21.5 (2022-06-03)
- Added color type to `Spinner`
- Added loading state to `Button` ([#112](https://github.com/Vieolo/vieolo-ui/issues/112))
- Added loading state to `IconButton` ([#113](https://github.com/Vieolo/vieolo-ui/issues/113))
- Added disabled option to `DatePicker` ([#138](https://github.com/Vieolo/vieolo-ui/issues/138))
- Added class name to `FormDialog` ([#179](https://github.com/Vieolo/vieolo-ui/issues/179))


## 0.21.4 (2022-05-14)
- Added ability to disable sorting in `List`

## 0.21.3 (2022-05-14)
- Added aria accessibility to `List` ([#173](https://github.com/Vieolo/vieolo-ui/issues/173))
- Added aria accessibility to `PeriodSelector` ([#174](https://github.com/Vieolo/vieolo-ui/issues/174))
- Fixed the sorting of items in Firefox in `List` ([#176](https://github.com/Vieolo/vieolo-ui/issues/176))

## 0.21.2 (2022-05-12)
- Added annotation layer for the `PDFViewer`

## 0.21.1 (2022-05-07)
- Removed react from dependecies

## 0.21.0 (2022-05-02)
- Added custom hover title for `Typography` ([#166](https://github.com/Vieolo/vieolo-ui/issues/166))
- Add the ability to disable selectability of text for `Typography` ([#167](https://github.com/Vieolo/vieolo-ui/issues/167))
- Fixed the selection of cells with numeric value of 0 in `TableInteractive` ([#171](https://github.com/Vieolo/vieolo-ui/issues/171))
- Fixed the hight of overlay in `TableInteractive` ([#172](https://github.com/Vieolo/vieolo-ui/issues/172))

#### Breaking Changes
- Unified all of the typography components into a single `Typography` component

## 0.20.9 (2022-04-29)
- Added color to items of `DropDownMenu` ([#154](https://github.com/Vieolo/vieolo-ui/issues/154))
- Added selectability to `TableInteractive` ([#158](https://github.com/Vieolo/vieolo-ui/issues/158))
- Added insights for selected cells in `TableInteractive` ([#159](https://github.com/Vieolo/vieolo-ui/issues/159))
- Added ability to edit text of cells in `TableInteractive` ([#160](https://github.com/Vieolo/vieolo-ui/issues/160))
- Fixed the emphasis of texts in `ClickableCard` ([#168](https://github.com/Vieolo/vieolo-ui/issues/168))
- Improved the key of `DropDownMenu` ([#169](https://github.com/Vieolo/vieolo-ui/issues/169))
- Fixed the position of overlay on fixed header in `TableInteractive` ([#170](https://github.com/Vieolo/vieolo-ui/issues/170))

## 0.20.8 (2022-04-23)
- Added onClick callback to `Card`
- Added `ClickableCard` component

## 0.20.7 (2022-04-21)
- Added `TableInteractive` component ([#30](https://github.com/Vieolo/vieolo-ui/issues/30))

## 0.20.6 (2022-04-16)
- Improved the display of `PDFViewer` in mobile devices
- Added dedicated `100vh-fill` CSS class which uses `-webkit-fill-available`

## 0.20.5 (2022-04-15)
- Added loading state to `PDFViewer` ([#27](https://github.com/Vieolo/vieolo-ui/issues/27))
- Improved the error state of `PDFViewer` ([#28](https://github.com/Vieolo/vieolo-ui/issues/28))
- Added `Spinner` component ([#111](https://github.com/Vieolo/vieolo-ui/issues/111))
- Added small mobile break point ([#149](https://github.com/Vieolo/vieolo-ui/issues/149))
- Adjusted size of the toolbar of `PDFViewer` in mobile layout ([#150](https://github.com/Vieolo/vieolo-ui/issues/150))
- Added `onExpandToggle` callback to `PDFViewer` ([#151](https://github.com/Vieolo/vieolo-ui/issues/151))

## 0.20.4 (2022-04-11)
- Added share functionality to the `PDFViewer` ([#146](https://github.com/Vieolo/vieolo-ui/issues/146))
- Added custom browser back button functionality for `PDFViewer` ([#147](https://github.com/Vieolo/vieolo-ui/issues/147))

## 0.20.3 (2022-04-04)
- Added class name and style to the `Card`
- Added class name to the `GridContainer`

## 0.20.2 (2022-04-02)
- Added explicit file name to the `PDFViewer`

## 0.20.1 (2022-04-02)
- Fixed the rotation of the `PDFViewer` ([#145](https://github.com/Vieolo/vieolo-ui/issues/145))

## 0.20.0 (2022-03-28)
- Added `text-light` variations to the color palette
- Added row height to `SwitchSet` ([#130](https://github.com/Vieolo/vieolo-ui/issues/130))
- Added font family option to `Typography`
- Added text align option to `Typography` ([#142](https://github.com/Vieolo/vieolo-ui/issues/142))
- Fixed display of `Grid`s with 0 XL size ([#143](https://github.com/Vieolo/vieolo-ui/issues/143))
- Added `Flex` component
- Added item positioning to the `Grid` ([#136](https://github.com/Vieolo/vieolo-ui/issues/136))
- Improved the accessibility of the `TitlePeriodCard` ([#139](https://github.com/Vieolo/vieolo-ui/issues/139))
- Improved the accessibility of the `ExpandableCard`

#### Deprecation
- `tertiary` group of colors are deprecated. They should be replaced by `primary` and `secondary` colors

#### Breaking Changes
- Removed the `gradient` variations of the colors in the Color palette
- Changed the default fonts
- Changed the default values of `bold` and `extra-bold` to 700 and 900 respectively
- Changed the font family of the `title` group of `Typography`
- Rewrote the CSS flex class ([#88](https://github.com/Vieolo/vieolo-ui/issues/88))

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