# Change Log

## v0.31.0 (2023-08-16)
- Fixed the license of the project ([#309](https://github.com/Vieolo/vieolo-ui/issues/309))
- Added `ProgressBar` component ([#310](https://github.com/Vieolo/vieolo-ui/issues/310))
- Added color options for `Walkthrough` buttons ([#312](https://github.com/Vieolo/vieolo-ui/issues/312))
- Added min and max dates for `DatePicker` ([#313](https://github.com/Vieolo/vieolo-ui/issues/313))

#### Breaking Changes
- Changed the props of the buttons of `Walkthrough`

## v0.30.8 (2023-08-07)
- Updated dependencies

## v0.30.7 (2023-08-03)
- Fixed the reference of the container of the `PDFViewer`
- Added `stretch` to `Flex` ([#308](https://github.com/Vieolo/vieolo-ui/issues/308))

## v0.30.6 (2023-07-29)
- Redesigned the `DatePicker` ([#286](https://github.com/Vieolo/vieolo-ui/issues/286))
- Added the ability to clear the value of `DatePicker`

## v0.30.5 (2023-07-25)
- Improved the padding of the `Card` ([#305](https://github.com/Vieolo/vieolo-ui/issues/305))
- Added `ConfirmationDialog` to `VieoloScaffold` ([#197](https://github.com/Vieolo/vieolo-ui/issues/197))
- Added support for always open navbar drawer

## v0.30.4 (2023-07-21)
- `Select` starts searching items when alphanumeric key press ([#285](https://github.com/Vieolo/vieolo-ui/issues/285))
- Fixed the `Chip` text CSS color ([#289](https://github.com/Vieolo/vieolo-ui/issues/289))
- Improved the hover state of the image picker
- Improved the type of page in `VieoloScaffold`

## v0.30.3 (2023-07-19)
- Fixed the height of the `ComponentRowTemplate` in responsive mode ([#299](https://github.com/Vieolo/vieolo-ui/issues/299))
- Added standalone margin SCSS class ([#300](https://github.com/Vieolo/vieolo-ui/issues/300))
- Added gap between the buttons of `FormDialog` ([#301](https://github.com/Vieolo/vieolo-ui/issues/301))
- `TableRow` can now accept a number as id ([#302](https://github.com/Vieolo/vieolo-ui/issues/302))
- `onClick` of the `IconButton` is now optional ([#303](https://github.com/Vieolo/vieolo-ui/issues/303))
- Improved the keyboard hover of `RadioGroup`
- Improved the `onClick` callback of `SwitchRow`

## v0.30.2 (2023-07-01)
- Added ability to change the direction of `RadioGroup` based on screen size ([#291](https://github.com/Vieolo/vieolo-ui/issues/291))
- Added ability to change the flex direction of `RadioGroupRow` based on screen size ([#298](https://github.com/Vieolo/vieolo-ui/issues/298))
- Added elevation to `SubNavbarRow` ([#297](https://github.com/Vieolo/vieolo-ui/issues/297))
- Added responsive props for `Flex`
- Centralized the break points for `xl`, `lg`, `md`, and `sm` screen sizes
- Added responsive sub states to `row-gap`, `column-gap`, and `flex` SCSS classes

## v0.30.1 (2023-06-23)
- Added `Card` props to `FormSection`
- Added the ability to pass components as secondary value to `FormSection`

## v0.30.0 (2023-06-06)
- Changed the License
- Moved the path of the component from `dist` to the main directory

## v0.29.1 (2023-06-03)
- Fixed the keyboard click of the button when disabled

## v0.29.0 (2023-05-13)
- Added `nuetral` color group ([#273](https://github.com/Vieolo/vieolo-ui/issues/273))
- Added on click for the `BarChart` ([#294](https://github.com/Vieolo/vieolo-ui/issues/294))
- Fixed the default height of the `BarChart` ([#295](https://github.com/Vieolo/vieolo-ui/issues/295))
- Fixed the button size of `TabRow` with long texts ([#296](https://github.com/Vieolo/vieolo-ui/issues/296))
- Improved the display of inline values in `BarChart`

#### Breaking Changes
- Removed `neutral-color` variable in SCSS. The same value can be found as `neutral-color-light`

## v0.28.5 (2023-05-12)
- Updated dependencies

## v0.28.4 (2023-04-26)
- Added max ref count to `BarChart` ([#209](https://github.com/Vieolo/vieolo-ui/issues/209))
- Fixed the tick frequency of `BarChart` ([#210](https://github.com/Vieolo/vieolo-ui/issues/210))
- Adjusted the text of Select to its size ([#281](https://github.com/Vieolo/vieolo-ui/issues/281))
- Removed the splash of `Chip` when no click callback is provided ([#288](https://github.com/Vieolo/vieolo-ui/issues/288))
- Fixed the max width of `FormDialog` ([#290](https://github.com/Vieolo/vieolo-ui/issues/290))
- Made the hight of `BarChart` optional

## v0.28.3 (2023-04-12)
- Updated dependencies

## v0.28.2 (2023-02-20)
- Added `useStringInputState` hook
- Added `useNumberInputState` hook

## v0.28.1 (2023-01-28)
- Added emphasis to the `TabRow` buttons ([#279](https://github.com/Vieolo/vieolo-ui/issues/279))

## v0.28.0 (2023-01-24)
- Added the `Anchor` component ([#144](https://github.com/Vieolo/vieolo-ui/issues/144))
- Made all of the props of `Divider` to be optional
- Added the `FloatingActionButton` component
- Added size large to `IconButton`
- Improved the border radius of `Button`

#### Breaking Changes
- The default thickness of `Divider` is changed from `half` to `1`

## v0.27.1 (2023-01-16)
- Added control over left padding in the `NavDrawerItem`
- Fixed the colors of the `NavDrawer`
- Fixed the closure of the `NavDrawer` when both href and onclick are present

## v0.27.0 (2023-01-13)
- Added shape type to the `Checkbox`

#### Breaking Changes
- Redesigned the `RadioGroup` and `RadioGroupRow`

## v0.26.1 (2023-01-10)
- Added description to the `TreeList` group ([#272](https://github.com/Vieolo/vieolo-ui/issues/272))

## v0.26.0 (2023-01-10)
- Improved the overflow of `Table`
- Added sticky column to `Table` ([#261](https://github.com/Vieolo/vieolo-ui/issues/261))
- Redesigned the `Checkbox` ([#269](https://github.com/Vieolo/vieolo-ui/issues/269))
- Added group and ignoring the onClick callback to `TreeList` ([#270](https://github.com/Vieolo/vieolo-ui/issues/270))

#### Breaking Changes
- Changed the icon to `startIcon` and `endIcon` in `TreeList` ([#270](https://github.com/Vieolo/vieolo-ui/issues/270))
- The check-all checkbox won't appear if the callback is omited in `Table`

## v0.25.5 (2022-12-28)
- Added `TabRow` component ([#141](https://github.com/Vieolo/vieolo-ui/issues/141))
- Added scroll to the wrap options of the `Flex`

## v0.25.4 (2022-12-26)
- Added logo redirect URL to the `navbar`
- Improved the style and contents of the `NavDrawer`
- Added support for logo to `Select` ([#265](https://github.com/Vieolo/vieolo-ui/issues/265))

## v0.25.3 (2022-12-25)
- Improved the display of the selected item in the `TreeList`
- Removed the hover when there is no onClick call back for the `Chip` ([#264](https://github.com/Vieolo/vieolo-ui/issues/264))

## v0.25.2 (2022-12-23)
- Added `TreeList` component ([#266](https://github.com/Vieolo/vieolo-ui/issues/266))

## v0.25.1 (2022-12-23)
- Fixed the typing of `VieoloApp`

## v0.25.0 (2022-12-23)
- Added `VieoloScaffold`

#### Breaking Changes
- `VieoloScaffold` replaces the functionality of `VieoloApp` to render the pages and frames and `VieoloApp` now wraps the main react app with router and redux

## v0.24.7 (2022-12-17)
- Added responsiveness to `Typography` ([#213](https://github.com/Vieolo/vieolo-ui/issues/213))

## v0.24.6 (2022-12-15)
- Updated dependencies

## v0.24.5 (2022-12-12)
- Added `ImagePicker` component ([#204](https://github.com/Vieolo/vieolo-ui/issues/204))

## v0.24.4 (2022-12-12)
- Added `StringInput` and `StringInputSet` components ([#250](https://github.com/Vieolo/vieolo-ui/issues/250))

## v0.24.3 (2022-12-11)
- Added position to `Modal`
- Improved the responsiveness of the `FormDialog`
- Improved the responsiveness of the `ConfirmationDialog` ([#196](https://github.com/Vieolo/vieolo-ui/issues/196))
- Improved the responsiveness of the `DatePicker` ([#262](https://github.com/Vieolo/vieolo-ui/issues/262))
- Added `Walkthrough` component
- Added the ability to add extra buttons to the left side of `FormDialog`

#### Deprecation
- The `width` prop of the `FormDialog` is deprecated in favor of the width provided by content.

## v0.24.2 (2022-11-28)
- Updated dependencies

## v0.24.1 (2022-11-28)
- Fixed the responsiveness of the `DropDownMenu` ([#198](https://github.com/Vieolo/vieolo-ui/issues/198))
- Improved the responsiveness of `Select`

## v0.24.0 (2022-11-23)
- Added width to `Select`
- Added error message to set components
- Added `SelectSet`

#### Breaking Changes
- Disabled the sorting of items of `List` by default ([#177](https://github.com/Vieolo/vieolo-ui/issues/177))
- Renamed the `SelectSet` to `SelectRow`
- Renamed the `SwitchSet` to `SwitchRow`
- Renamed the `RadioGroupSet` to `RadioGroupRow`
- Changed the value of the `NumberInputSet` from array to object
- Changed the arguments of `selectOptionFromSelect` of `VieoloUIInteraction` of `cypressTools`

## v0.23.18 (2022-11-20)
- Updated dependencies

## v0.23.17 (2022-11-16)
- Improved the VUI interaction in cypress tools

## v0.23.16 (2022-11-16)
- Added `cypressTools`, a set of commands and functions to ease the writing of Cypress tests for Vieolo UI

## v0.23.15 (2022-11-06)
- Added `CalendarStatistic` component ([#13](https://github.com/Vieolo/vieolo-ui/issues/13))
- Added root colors ([#214](https://github.com/Vieolo/vieolo-ui/issues/214))
- Added `none-background` emphases ([#217](https://github.com/Vieolo/vieolo-ui/issues/217))
- Fixed the position of toolbar framework in `FileViewer` in mobile devices ([#258](https://github.com/Vieolo/vieolo-ui/issues/258))
- Added `round` and `circle` to the border radius values
- Fixed the `onClick` of buttons when in loading state
- Added ability to add `SwitchSet` in the `DropDownMenu`
- Added transparent background to buttons in low and none emphasis modes

#### Deprecation
- scss: deprecated `content-background-color` in favor of `background-content-color`
- scss: deprecated `normal-text-color` in favor of `light-mode-normal-text-color`
- scss: deprecated `border-color`
- scss: deprecated `hover-color`

## v0.23.14 (2022-10-17)
- Added basic close button to `ImageViewer` ([#249](https://github.com/Vieolo/vieolo-ui/issues/249))
- Added `min-width` CSS classes ([#252](https://github.com/Vieolo/vieolo-ui/issues/252))

## v0.23.13 (2022-10-01)
- Added `NumberInput` component ([#246](https://github.com/Vieolo/vieolo-ui/issues/246))
- Added `NumberInputSet` component ([#247](https://github.com/Vieolo/vieolo-ui/issues/247))
- Merged `Textarea` into`Input` ([#248](https://github.com/Vieolo/vieolo-ui/issues/248))

#### Deprecation
- `Textarea` and `TextareaSet` components are now deprecated in favor of `Input` and `InputSet` components respectively

## v0.23.12 (2022-09-26)
- Improved the content type detection of the `FileViewer`

## v0.23.11 (2022-09-25)
- Added `FileViewerFrame` component
- Added file frame for `VideoViewer` ([#235](https://github.com/Vieolo/vieolo-ui/issues/234))
- Added file frame for `ImageViewer` ([#235](https://github.com/Vieolo/vieolo-ui/issues/235))
- Improved the download of file in `FileViewer` ([#237](https://github.com/Vieolo/vieolo-ui/issues/237))

## v0.23.10 (2022-09-12)
- Added aria label to `RadioGroup` items ([#229](https://github.com/Vieolo/vieolo-ui/issues/229))
- Fixed the children of `FormSection` ([#239](https://github.com/Vieolo/vieolo-ui/issues/239))
- Added aria label to `SwitchSet` ([#240](https://github.com/Vieolo/vieolo-ui/issues/240))
- Added aria label to `Chip` ([#241](https://github.com/Vieolo/vieolo-ui/issues/241))
- Fixed propagation of `Select` clear button ([#244](https://github.com/Vieolo/vieolo-ui/issues/244))
- Fixed propagation of `ItemRow` ([#245](https://github.com/Vieolo/vieolo-ui/issues/245))

## v0.23.9 (2022-09-03)
- Adjusted the `FileViewer` for `binary/octet-stream` content type

## v0.23.8 (2022-09-03)
- Added `VideoViewer` component
- Added `ImageViewer` component
- Added `FileViewer` component ([#231](https://github.com/Vieolo/vieolo-ui/issues/231))

## v0.23.7 (2022-08-30)
- Improved the emphasis options of `ExpandableCard` ([#218](https://github.com/Vieolo/vieolo-ui/issues/218))
- Fixed the display of multiple actions in `ExpandableCard` ([#225](https://github.com/Vieolo/vieolo-ui/issues/225))
- Improved the accessibility of `PeriodSelector` ([#228](https://github.com/Vieolo/vieolo-ui/issues/228))

## v0.23.6 (2022-08-28)
- Added `DoubleToggleList` component ([#132](https://github.com/Vieolo/vieolo-ui/issues/132))
- Added `SubDashboard` component
- Fixed propagation of `Chip` ([#216](https://github.com/Vieolo/vieolo-ui/issues/216))

## v0.23.5 (2022-08-26)
- Added weekday to the day period of `PeriodSelector`
- Changed the display of title of the `List` ([#219](https://github.com/Vieolo/vieolo-ui/issues/219))
- Added action buttons to the `List` ([#221](https://github.com/Vieolo/vieolo-ui/issues/221))
- Added managed border radius mode to the `List` ([#223](https://github.com/Vieolo/vieolo-ui/issues/223))

## v0.23.4 (2022-08-09)
- Fixed the keyboard interaction of `Select` when disabled ([#191](https://github.com/Vieolo/vieolo-ui/issues/191))
- Added title to the auxiliary items of `GanttChart` ([#202](https://github.com/Vieolo/vieolo-ui/issues/202))
- Fixed the aria label of buttons of `FormDialog` ([#211](https://github.com/Vieolo/vieolo-ui/issues/211))

## v0.23.3 (2022-07-30)
- Fixed the color range of `DonutChart`

## v0.23.2 (2022-07-30)
- Fixed the rendition of `DonutChart` when passed an empty array

## v0.23.1 (2022-07-30)
- Fixed the re-render of the `BarChart`
- Re-wrote the `DonutChart`
- Added extra-small size to `Button`
- Improved the color styles of `ClickableCard`
- Added thickness and padding to `Divider`
- Improved the style of `Select`
- Added `ActionCard` component

## v0.23.0 (2022-07-24)
- Improved the `BarChart`
- Added `Stacked` and `Grouped` types to the `BarChart`

#### Breaking Changes
- `color` field of the `BarChartData` is changed from string to the Vieolo UI color pallet
- `dataAxisMin` prop is removed from `BarChart`

## v0.22.11 (2022-07-18)
- Added height option to `Chip` ([#178](https://github.com/Vieolo/vieolo-ui/issues/178))
- Added loading state to `FormDialog` ([#203](https://github.com/Vieolo/vieolo-ui/issues/203))

## v0.22.10 (2022-07-18)
- Added wrap to the `Flex`

## v0.22.9 (2022-07-15)
- Fixed the propagation of the `DropDownMenu` item

## v0.22.8 (2022-07-03)
- Added optional property to `TimeInput`

## v0.22.7 (2022-07-03)
- Fixed the propagation of the `ExpandableCard`

## v0.22.6 (2022-07-02)
- Fixed the z-index of `Navbar`

## v0.22.5 (2022-06-28)
- Updated dependencies

## v0.22.4 (2022-06-27)
- Fixed the back functionality of `SubNavbarRow`

## v0.22.3 (2022-06-27)
- Added `Navbar` Component
- Added `NavDrawer` Component
- Added `SubNavbarRow` Component
- Added `Page` Component
- Added `PageFrame` Component
- Added `VieoloApp` Component
- Added `low-normal` and `none-normal` to emphasis types

## v0.22.2 (2022-06-26)
- Added `FormSection` ([#17](https://github.com/Vieolo/vieolo-ui/issues/17))
- Added `DonutChart` ([#20](https://github.com/Vieolo/vieolo-ui/issues/20))
- Added typography type to `Table` header ([#187](https://github.com/Vieolo/vieolo-ui/issues/187))
- Added support for custom component in `Table` header ([#188](https://github.com/Vieolo/vieolo-ui/issues/188))

## v0.22.1 (2022-06-22)
- Added the `RadioGroupSet` component ([#51](https://github.com/Vieolo/vieolo-ui/issues/51))
- Fixed the position of checkbox in `Table` header ([#76](https://github.com/Vieolo/vieolo-ui/issues/76))
- Added the `SelectSet` component ([#129](https://github.com/Vieolo/vieolo-ui/issues/129))

## v0.22.0 (2022-06-21)

#### Breaking Changes
- The individual import path for Components is changed to `import D from '@vieolo/vieolo-ui/dist/D` ([#180](https://github.com/Vieolo/vieolo-ui/issues/180));
- The default name of `ConfirmationDialog` is fixed

## v0.21.7 (2022-06-19)
- Added keyboard interaction for `DropdownMenu` ([#39](https://github.com/Vieolo/vieolo-ui/issues/39))
- Added keyboard interaction for `RadioGroupSet` ([#52](https://github.com/Vieolo/vieolo-ui/issues/52))
- Added mobile layout for `DatePicker` ([#74](https://github.com/Vieolo/vieolo-ui/issues/74))
- Added mobile layout for `Select` ([#75](https://github.com/Vieolo/vieolo-ui/issues/75))
- Made `TabSwitch` responsive ([#140](https://github.com/Vieolo/vieolo-ui/issues/140))
- Added ability to open only one group in `List` ([#153](https://github.com/Vieolo/vieolo-ui/issues/153))

## v0.21.6 (2022-06-13)
- Fixed the propagation of selecting week in `DatePicker`

## v0.21.5 (2022-06-03)
- Added color type to `Spinner`
- Added loading state to `Button` ([#112](https://github.com/Vieolo/vieolo-ui/issues/112))
- Added loading state to `IconButton` ([#113](https://github.com/Vieolo/vieolo-ui/issues/113))
- Added disabled option to `DatePicker` ([#138](https://github.com/Vieolo/vieolo-ui/issues/138))
- Added class name to `FormDialog` ([#179](https://github.com/Vieolo/vieolo-ui/issues/179))


## v0.21.4 (2022-05-14)
- Added ability to disable sorting in `List`

## v0.21.3 (2022-05-14)
- Added aria accessibility to `List` ([#173](https://github.com/Vieolo/vieolo-ui/issues/173))
- Added aria accessibility to `PeriodSelector` ([#174](https://github.com/Vieolo/vieolo-ui/issues/174))
- Fixed the sorting of items in Firefox in `List` ([#176](https://github.com/Vieolo/vieolo-ui/issues/176))

## v0.21.2 (2022-05-12)
- Added annotation layer for the `PDFViewer`

## v0.21.1 (2022-05-07)
- Removed react from dependecies

## v0.21.0 (2022-05-02)
- Added custom hover title for `Typography` ([#166](https://github.com/Vieolo/vieolo-ui/issues/166))
- Add the ability to disable selectability of text for `Typography` ([#167](https://github.com/Vieolo/vieolo-ui/issues/167))
- Fixed the selection of cells with numeric value of 0 in `TableInteractive` ([#171](https://github.com/Vieolo/vieolo-ui/issues/171))
- Fixed the hight of overlay in `TableInteractive` ([#172](https://github.com/Vieolo/vieolo-ui/issues/172))

#### Breaking Changes
- Unified all of the typography components into a single `Typography` component

## v0.20.9 (2022-04-29)
- Added color to items of `DropDownMenu` ([#154](https://github.com/Vieolo/vieolo-ui/issues/154))
- Added selectability to `TableInteractive` ([#158](https://github.com/Vieolo/vieolo-ui/issues/158))
- Added insights for selected cells in `TableInteractive` ([#159](https://github.com/Vieolo/vieolo-ui/issues/159))
- Added ability to edit text of cells in `TableInteractive` ([#160](https://github.com/Vieolo/vieolo-ui/issues/160))
- Fixed the emphasis of texts in `ClickableCard` ([#168](https://github.com/Vieolo/vieolo-ui/issues/168))
- Improved the key of `DropDownMenu` ([#169](https://github.com/Vieolo/vieolo-ui/issues/169))
- Fixed the position of overlay on fixed header in `TableInteractive` ([#170](https://github.com/Vieolo/vieolo-ui/issues/170))

## v0.20.8 (2022-04-23)
- Added onClick callback to `Card`
- Added `ClickableCard` component

## v0.20.7 (2022-04-21)
- Added `TableInteractive` component ([#30](https://github.com/Vieolo/vieolo-ui/issues/30))

## v0.20.6 (2022-04-16)
- Improved the display of `PDFViewer` in mobile devices
- Added dedicated `100vh-fill` CSS class which uses `-webkit-fill-available`

## v0.20.5 (2022-04-15)
- Added loading state to `PDFViewer` ([#27](https://github.com/Vieolo/vieolo-ui/issues/27))
- Improved the error state of `PDFViewer` ([#28](https://github.com/Vieolo/vieolo-ui/issues/28))
- Added `Spinner` component ([#111](https://github.com/Vieolo/vieolo-ui/issues/111))
- Added small mobile break point ([#149](https://github.com/Vieolo/vieolo-ui/issues/149))
- Adjusted size of the toolbar of `PDFViewer` in mobile layout ([#150](https://github.com/Vieolo/vieolo-ui/issues/150))
- Added `onExpandToggle` callback to `PDFViewer` ([#151](https://github.com/Vieolo/vieolo-ui/issues/151))

## v0.20.4 (2022-04-11)
- Added share functionality to the `PDFViewer` ([#146](https://github.com/Vieolo/vieolo-ui/issues/146))
- Added custom browser back button functionality for `PDFViewer` ([#147](https://github.com/Vieolo/vieolo-ui/issues/147))

## v0.20.3 (2022-04-04)
- Added class name and style to the `Card`
- Added class name to the `GridContainer`

## v0.20.2 (2022-04-02)
- Added explicit file name to the `PDFViewer`

## v0.20.1 (2022-04-02)
- Fixed the rotation of the `PDFViewer` ([#145](https://github.com/Vieolo/vieolo-ui/issues/145))

## v0.20.0 (2022-03-28)
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

## v0.19.5 (2022-03-23)
- Improved the `width` and `height` CSS classes
- Added `withAndHeightSize` type
- Added `Divider` Component ([#133](https://github.com/Vieolo/vieolo-ui/issues/133))
- Added `Spacer` Component ([#134](https://github.com/Vieolo/vieolo-ui/issues/134))
- Added `TitlePeriodCard` Component ([#135](https://github.com/Vieolo/vieolo-ui/issues/135))

## v0.19.4 (2022-03-22)
- Added the ability to reorder the rows of `Table` ([#131](https://github.com/Vieolo/vieolo-ui/issues/131))

## v0.19.3 (2022-03-21)
- Added `content-background-color` variable to SCSS. This variable is used as background for none and low emphasis

## v0.19.2 (2022-03-21)
- Fixed the background and border color of the none and low emphasis

## v0.19.1 (2022-03-19)
- Added `GridTwo` and `GridThree` to the export

## v0.19.0 (2022-03-19)
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


## v0.18.2 (2022-03-13)
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

## v0.18.1 (2022-03-08)
- Added border radius option to `Chip` ([#109](https://github.com/Vieolo/vieolo-ui/issues/109))
- Added emphasis option to `Chip` ([#108](https://github.com/Vieolo/vieolo-ui/issues/108))
- Fixed the default border radius of `IconButton` ([#110](https://github.com/Vieolo/vieolo-ui/issues/110))

## v0.18.0 (2022-03-07)

#### Breaking Changes
- The return value of `onItemResize` function of `GanttChart` is converetd into a promise

## v0.17.3 (2022-03-07)
- Added accept response to the resize callback of items in `GanttChart` ([#106](https://github.com/Vieolo/vieolo-ui/issues/106))

## v0.17.2 (2022-03-07)
- Added resizing of the items to the `GanttChart` for
    - Allowing items to overlap ([#104](https://github.com/Vieolo/vieolo-ui/issues/104))
    - Preventing items to overlap ([#103](https://github.com/Vieolo/vieolo-ui/issues/103))
    - Fixed increment of the resize ([#105](https://github.com/Vieolo/vieolo-ui/issues/105))
- Moved the drag handle from the entire row to the row title cell in `GanttChart`
- Fixed the position of drop zone in `GanttChart` in Chrome and Firefox
- Fixed the propagation of dropdown menu button [#102](https://github.com/Vieolo/vieolo-ui/issues/102)

## v0.17.1 (2022-03-04)
- Export the `GanttChartAuxiliaryItemType` ([#99](https://github.com/Vieolo/vieolo-ui/issues/99))
- Added color indicator for the rows in `GanttChart` ([#100](https://github.com/Vieolo/vieolo-ui/issues/100))

## v0.17.0 (2022-03-04)
- Added item reordering in `GanttChart` ([#98](https://github.com/Vieolo/vieolo-ui/issues/98))

#### Breaking Changes
- Moved the sub and sup items from the items to rows in `GanttChart` ([#96](https://github.com/Vieolo/vieolo-ui/issues/96))

## v0.16.3 (2022-02-28)
- Added the ability to ignore items while filtering in `GanttChart` ([#93](https://github.com/Vieolo/vieolo-ui/issues/93))
- Added aria label to sub and sup items in `GanttChart` ([#94](https://github.com/Vieolo/vieolo-ui/issues/94))
- Fixed the touch events for iPad and iPhones in `GanttChart` ([#95](https://github.com/Vieolo/vieolo-ui/issues/95))

## v0.16.2 (2022-02-24)
- Fixed the overflow style of the main in `useAppearingContainer` hook

## v0.16.1 (2022-02-24)
- Fixed the bar start and end style of the `GanttChart`

## v0.16.0 (2022-02-23)
- Added touch support for the `GanttChart` items
- Added context menu for the `GanttChart` row titles ([#92](https://github.com/Vieolo/vieolo-ui/issues/92))

#### Breaking Changes
- `GanttChartDataType` is renamed to `GanttChartRowType`
- `GanttChartContextMenuItem`'s `onClick` signature is changed to contain the selected row as well.

## v0.15.4 (2022-02-21)
- Added aria accessibility to the `GanttChart`
- Added aria accessibility to the `ContextMenu`
- Added aria accessibility to the `ConfirmationDialog`
- Added aria accessibility to the `FormDialog`

## v0.15.3 (2022-02-17)
- Added dedicated aria accessibility for the `DateTimePicker` ([#89](https://github.com/Vieolo/vieolo-ui/issues/89))
- Added aria accessibility and data test ID for all `Typography` components ([#90](https://github.com/Vieolo/vieolo-ui/issues/90))
- Added aria accessibility for the `Table` ([#91](https://github.com/Vieolo/vieolo-ui/issues/91))

## v0.15.2 (2022-02-03)
- Added aria accessibility for the `DatePicler`
- Improved the style of the default button of `DatePicker`

## v0.15.1 (2022-01-29)
- Uniformed the style of the label of `DateTimePicker` with the rest of components
- Fixed the persistence of date search input in `DatePicker` ([#87](https://github.com/Vieolo/vieolo-ui/issues/87))

## v0.15.0 (2022-01-29)
- Added `DateInput` component
- Added aria accessibility to the `DateTimeInput` ([#86](https://github.com/Vieolo/vieolo-ui/issues/86))
- Improved the style of the label for `DateTimeInput` ([#85](https://github.com/Vieolo/vieolo-ui/issues/85))
- Added Keyboard accessibility for `DatePicker` ([#73](https://github.com/Vieolo/vieolo-ui/issues/73))

#### Breaking Changes
- Renamed the `TimePicker` component to `TimeInput`

## v0.14.3 (2022-01-28)
- Added `DateTimePicker` component
- Added subtitle search for `List` ([#84](https://github.com/Vieolo/vieolo-ui/issues/84))

## v0.14.2 (2022-01-08)
- Added extra small size to `IconButton` ([#77](https://github.com/Vieolo/vieolo-ui/issues/77))
- Added aria label to `IconButton` ([#78](https://github.com/Vieolo/vieolo-ui/issues/78))
- Added aria label to `Button` ([#79](https://github.com/Vieolo/vieolo-ui/issues/79))
- Added aria label to `Input` ([#80](https://github.com/Vieolo/vieolo-ui/issues/80))
- Added aria label to `Textarea` ([#81](https://github.com/Vieolo/vieolo-ui/issues/81))
- Added aria accessibility attributes to `Select` ([#82](https://github.com/Vieolo/vieolo-ui/issues/82))
- Fixed the key of the `Select` items ([#83](https://github.com/Vieolo/vieolo-ui/issues/83))

## v0.14.1 (2022-01-02)
- `FileInput` now displays the text along with icons ([#56](https://github.com/Vieolo/vieolo-ui/issues/56))
- `FileInput` now enforces the file type in drag and drop ([#57](https://github.com/Vieolo/vieolo-ui/issues/57))

## v0.14.0 (2021-12-31)
- Added `Checkbox` Component
- Added disable to the `Input` ([#72](https://github.com/Vieolo/vieolo-ui/issues/72))
- Added check functionality to `Table` ([#40](https://github.com/Vieolo/vieolo-ui/issues/40))

#### Breaking Changes
- Changed the row prop of the `Table` from `React.ReactNode[][]` to `TableRow`

## v0.13.5 (2021-12-29)
- Added `ContextMenu` Component
- Added `GanttChart` Component ([#18](https://github.com/Vieolo/vieolo-ui/issues/18))
- Added `BarChart` Component ([#19](https://github.com/Vieolo/vieolo-ui/issues/19))

## v0.13.4 (2021-12-23)
- Added `DatePicker` component

## v0.13.3 (2021-12-10)
- Added `ConfirmationDialog` to the export

## v0.13.2 (2021-12-10)
- Added `ConfirmationDialog` component
- Fixed the keyboard accessibility of `SwitchSet` when disabled ([#69](https://github.com/Vieolo/vieolo-ui/issues/69))
- `SwitchSet` now accepts custom components as well as strings for title and subtitle ([#59](https://github.com/Vieolo/vieolo-ui/issues/59))

## v0.13.1 (2021-12-07)
- Improved the keyboard accessibility for `Select`

## v0.13.0 (2021-12-07)
- Added emphasis for the buttons in `FormDialog` ([#68](https://github.com/Vieolo/vieolo-ui/issues/68))
- Added disabled option for the items in `List` ([#67](https://github.com/Vieolo/vieolo-ui/issues/67))
- Improved click functionality on `Select` ([#66](https://github.com/Vieolo/vieolo-ui/issues/66))
- Added keyboard accessibility for `Select` ([#38](https://github.com/Vieolo/vieolo-ui/issues/38))
- Added keyboard accessibility for `SwitchSet` ([#37](https://github.com/Vieolo/vieolo-ui/issues/37))

#### Breaking Changes
- Changed the button configuration and their relevant types for `FormDialog`

## v0.12.0 (2021-11-25)
- Added auxiliary button to `Button` ([#65](https://github.com/Vieolo/vieolo-ui/issues/65))
- Added optional type to `IconButton` ([#61](https://github.com/Vieolo/vieolo-ui/issues/61))
- Added height control to `Select` ([#62](https://github.com/Vieolo/vieolo-ui/issues/62))
- Improved the display of categories in `Select` ([#64](https://github.com/Vieolo/vieolo-ui/issues/64))
- Added `TabSwitch` component ([#63](https://github.com/Vieolo/vieolo-ui/issues/63))

#### Breaking Changes
- `DropDownMenu` items now require a unique value

## v0.11.0 (2021-11-17)
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

## v0.10.11 (2021-11-03)

- Exported the `Typography` components

## v0.10.10 (2021-10-24)

- Fixed the next button of pagination of `Table`

## v0.10.9 (2021-10-24)

- Added sticky header to the `Table` ([#41](https://github.com/Vieolo/vieolo-ui/issues/41))
- Improved the generic CSS classes ([#26](https://github.com/Vieolo/vieolo-ui/issues/26))
- Replaced the Material UI v4 with v5
- Added pagination to the `Table` ([#42](https://github.com/Vieolo/vieolo-ui/issues/42))
- Added dense layout to the `Table`
- Improved the hover and ripple color of buttons ([#54](https://github.com/Vieolo/vieolo-ui/issues/54))

#### Deprecation
- The `removeHeaderRow` prop of the `Table` has been deprecated. The `headers` props is not optional, omitting which will result in a table without the header row.

## v0.10.8 (2021-10-02)

- Added `RadioGroup` component ([#50](https://github.com/Vieolo/vieolo-ui/issues/50))
- Added `preValidationNameEditor` function to the `FileInput`

## v0.10.7 (2021-10-02)

- Added ability to remove the header row of the table ([#49](https://github.com/Vieolo/vieolo-ui/issues/49))

## v0.10.6 (2021-09-29)

- Fixed the `onRowClick` of `Table` ([#48](https://github.com/Vieolo/vieolo-ui/issues/48))
- Fixed the key error of the rows of `Table` ([#47](https://github.com/Vieolo/vieolo-ui/issues/47))

## v0.10.5 (2021-09-28)

- Added `Table` Component
- Added `FormDialog` Component
- Fixed the rendition of PDF files with pre-existing rotations ([#36](https://github.com/Vieolo/vieolo-ui/issues/36))
- Fixed the CSS class name of `list` component ([#33](https://github.com/Vieolo/vieolo-ui/issues/33))
- Added Typography to the `ItemRow` ([#35](https://github.com/Vieolo/vieolo-ui/issues/35))

## v0.10.4 (2021-09-24)

- Added `List` component
- Exported `ItemRow` and `ItemRowSearch` components
- Exported `PeriodOptions` enum

## v0.10.3 (2021-09-23)

- Added `PeriodSelector` component
- Changed the `p` tags of `SwitchSet` with `Typography` components

## v0.10.2 (2021-09-22)

- Fixed the `dropdown` class of the `dropdownmenu`

## v0.10.1 (2021-09-21)

- Fixed the overflow of `main` while using `DropDownMenu` and `Select`
- Changed the dropdown of `DropDownMenu` and `Select` to have a fixed position

#### Deprecation
- The `position` prop of the `DropDownMenu` has been deprecated. The position of the drop down is calculated automatically.

## v0.10.0 (2021-09-16)

- Added `PDFViewer`
- Fixed the division bug in the SCSS file
- Added `width` and `height` utility classes

## v0.9.0 (2021-07-13)

- Improved the style of DropDownMenu
- Added position to the DropDownMenu (default: `left`)

#### Breaking Changes
- Fixed the typo of `onItemSelec` to `onItemSelect` in the DropDownMenu

## v0.8.3 (2021-07-01)

- Moved react-scripts, webvitals, and node-sass to dev dependencies


## v0.8.2 (2021-06-19)

- Added action button to the `InputSet`


## v0.8.1 (2021-06-03)

- Fixed the `uesEffect` error of `Select`


## v0.8.0 (2021-06-03)

- Added `searchable`, `clearable`, and `multipleChoice` functionalities to `Select`
- Added `ItemRow` component
- Added Typography components and classes

#### Breaking Changes
- Changed the `selectedItem` prop of `Select` from `string` to `string[]` 
- Changed the `tertiary-color` values