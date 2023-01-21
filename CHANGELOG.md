# Changelog

## v0.6.1

- Comments are now preserved
- Theme
  - Now applied automatically based on `prefers-color-scheme`
  - Theme is now switched using the `re-dark` or `re-light` classes instead of a dataset
  - Added `color-scheme` to themes
  - Added `accent-color` to body
  - `--primary-muted` now uses `rgba` to be transparent rather than lightened
- Normalize
  - Added `textarea`
  - Remove body transitions
  - Added `line-through` style to `strike` element
  - `anchor` elements are now `inline-block`
- Input
  - Clear button no longer appears when `required` is true
- Dialog
  - Fix body display issue
  - Fix `id` prop not being passed to `dialog` element
  - Added closing animations
  - Redid animations using `element.animate`
- Radio
  - Refactor to be more inline with other input styles
  - Added `labelClassName` prop
- Checkbox
  - Refactor to be more inline with other input styles
- Select
  - Minor style changes
  - Fixed issue trying to tab into the list box
- Fixed `Alert` actions gap
- Added `isHTMLAnchorElement` & `isHTMLDialogElement` util

## v0.6.0

- Refactored `Dialog` component to use the new `dialog` element
- Added tooltip component
- Stylesheets
  - `reset.less` has been renamed to `normalize.less` as it normalizes styles rather than resetting them
  - Added a monospaced font stack (`@font-family-monospace`) to `normalize.less`
  - More basic HTML ("Hypertext Markup Language") tags have received normalizing styles
  - The `normalize.less` has become optional meaning you can choose to only import component styles and
    the `themes.less`
  - Added some missing component styles to `renum.less`
- Button
  - colors have been slightly changed
  - Fixed text cutting off & blurry icons
- Fixed `select` dropdown text cutting off due to width
- ♿ Browsers default `font-size` is now used
- 👋 removed some unnecessary hooks
- `input` component now takes up full width
- `checkbox` & `radio` component styles are now consistent with the `input` styles
- Radio
  - Removed `line-height` of `1`
  - Removed `label` prop
  - `children` prop will now bbe used as label
- fix loading `active` class

## v0.5.1

- Context
  - Added localization
  - Removed all props relating to `prefixCls`

## v0.5.0

- Added rtl ("right to left") text direction support
- Icons can now receive props
- The reset styles now standardize styles rather than removing them
- Moved the actions of an alert to the bottom
- The light mode `--border-subtle` color was made slightly lighter
- Removed the `ul` used in the dialog footer
- Actions within the dialog footer are shown rendered to make the primary action more accessible to non-mouse users

## v0.4.2

- Refactored the `font-weight` variables to be consistent with OpenType
- Input
  - Fixed pixel gap between prefixes and suffixes
  - Fixed input not taking up full width of wrapper parent

## v0.4.1

- All `rem` units have been converted (wololo) to `em` for consistency & accessibility
- Increased the size of the `outline-width` to `0.25em` for better visibility
- Fixed alert dialog styles
- Redid the box shadows

## v0.4.0

- Added Dialog component
- Added `useMount` hook
- Added `useScrollLock` hook
- Fix input not taking up full width

## v0.3.0

- Added Alert component
- Added Checkbox component (no intermediate state styling yet)
- Added a css file including all styles, removing the requirement to have an import util
- Normalized a bunch of colors for input components
- Fixed some outline styles

## v0.2.0

- Added Select component
- Updated some JSDocs
- Button
  - Fixed text colors
  - Fixed disabled style
  - Fixed styles for loading & light type
  - Fixed `onClick` being called when `loading` is `true`
- ButtonGroup
  - Fixed props type export
- Input
  - Fixed cursor style when disabled
  - Added `clearable` prop
  - Fixed miscellaneous styling issues

## v0.1.4

- Fixed font styles for input
- Added `getPrefixCls` to the context
- Button
  - Fixed font styles
  - Tweaked disabled bg color is dark mode
  - Added minor `Button.Group` component
- Added a visual `:active` indicator when in `:focus-visible` mode

## v0.1.3

- Tweaked background colors
- Input
  - Tweaked active style
  - Tweaked light mode style
  - Fixed alignment issues for pre & suffixes
- Updated dev depenencies
- Added transition speed less variables

## v0.1.2

- Fixed anchor active color
- Reduced grays mix percentage from 6% to 2%
- Added placeholder styles to input
