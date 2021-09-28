# Change Log

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