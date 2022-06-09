# Renum

[![npm](https://img.shields.io/npm/v/@enumiton/renum?color=0c72cc)](https://www.npmjs.com/package/@enumiton/renum)
![Package License](https://img.shields.io/github/license/enumiton/renum)

## Description

Another React component library with two unique traits: no unnecessary depenencies and a small package size.

## Getting started

### Install

```sh
yarn add @enumiton/renum
```

```sh
npm install @enumiton/renum
```

### Usage

All components make use of the `em`/`rem` units, this means you can easily make any components larger or smaller by changing
the `font-size` of the component or its parent.

```tsx
import { Button } from '@enumiton/renum';
import '@enumiton/renum/es/styles/reset.less';

function App() {
  return (
    <Button type="primary">
      Hello world
    </Button>
  );
}
```

## Types

Since `renum` is written entirely in TypeScript it has types out-of-the-box. It is recommended to always use TypeScript when using
this package.

## Icons

All of the icons are from [Tabler Icons](https://github.com/tabler/tabler-icons), a project which provides free and open source
icons created by [Paweł Kuna](https://github.com/codecalm).

The icons have already been optimized using svgo so you don't have to.

### Usage

Icons are imported from `@enumiton/renum/icons`. All icons are in seperate files to make tree shaking easy.

```tsx
import { Button } from '@enumiton/renum';
import { Menu } from '@enumiton/renum/icons';

function App() {
  return (
    <Button
      icon={ <Menu /> }
      type="invisible"
      shape="circle"
      aria-label="Open menu"
    />
  );
}
```

## Accessibility

As someone who cares about accessibility, I've made sure that the components of Renum are as accessible as possible. However, this
doesn't mean your website will automatically be accessibile by just using this library.

When making your website you'll still have to consider accessibility, like giving an input a label. If you're struggling to make
something accessible feel free to open an issue in this repository asking for help, if I have time I could give it a look.

## Contributing

Todo

## Todo

- [ ] Better color scheme generation.
- [ ] Publish & release a beta version.
- Components:
    - [x] Button
    - [ ] Button Group
    - [x] Input
    - [ ] Select
    - [ ] Checkbox
    - [ ] Radio
    - [ ] Segmented Control
    - [ ] Alert
    - [ ] Breadcrumbs
    - [ ] Badge
    - [ ] Paper
    - [ ] Menu
    - [ ] Popover
    - [ ] Modal
    - [ ] Drawer
    - [ ] Rate
    - [ ] Slider
    - [ ] Switch
    - [ ] Tag
    - [ ] Chip
    - ...

## Development

### Install

```sh
$ git clone git@github.com:enumiton/renum.git
$ cd renum
$ yarn
$ yarn icons
```

### Usage

```sh
yarn dev
```

### Building

```sh
yarn build
```
