# Renum

[![npm webpage](https://img.shields.io/npm/v/@enumiton/renum?color=0c72cc)](https://www.npmjs.com/package/@enumiton/renum)
[![package license](https://img.shields.io/github/license/enumiton/renum)](https://github.com/enumiton/renum/blob/master/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@enumiton/renum)](https://bundlephobia.com/package/@enumiton/renum)

## Description

Another React component library with two unique traits: no unnecessary dependencies and a small package size.

## Getting started

### Install

```sh
yarn add @enumiton/renum
```

### Usage

All components make use of the `em`/`rem` units, this means you can easily make any components larger or smaller by
changing the `font-size` of the component or its parent.

```tsx
import { Button } from '@enumiton/renum';
import '@enumiton/renum/es/styles/renum.less';

function App() {
	return (
		<Button type="primary">
			Hello world
		</Button>
	);
}
```

Also don't forget to use the `RenumProvider` component and its localization. You can import different locales
from `@enumiton/renum/es/locale/` or make your own by using the `Locale` type and passing it to the locale prop.

```tsx
import { RenumProvider } from '@enumiton/renum';
import locale from '@enumiton/renum/es/locale/en-us';

function App() {
	return (
		<RenumProvider locale={ locale }>
			{/* … */ }
		</RenumProvider>
	);
}
```

### Styles

All styles can be import from `@enumiton/renum/es/styles/renum.css|less`, although this isn't recommended for obvious
reasons.

A better option is to import the themes from `@enumiton/renum/es/styles/themes.less`, optionally import a styles
normalizer from `@enumiton/renum/es/styles/normalize.less` and then import all component specific styles dynamically
using a library like [vite-plugin-style-import](https://npmjs.com/package/vite-plugin-style-import).

## Types

Since `renum` is written entirely in TypeScript it has types out-of-the-box.

Though I don't recommend it, you could still use this library with JavaScript. Since props/values are only validated
using TypeScript you *will* run into issues with JavaScript. I will **not** fix any issues related to wrong props/values
being passed through components in JavaScript.

## Icons

> ⚠️ The icon pack will likely be split into its own NPM package due to its install size.

All the icons are from [Tabler Icons](https://github.com/tabler/tabler-icons), a project which provides free and open
source icons created by [Paweł Kuna](https://github.com/codecalm).

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
			type="text"
			shape="circle"
			aria-label="Open menu"
		/>
	);
}
```

## Accessibility

As someone who cares about accessibility, I've made sure that the components of Renum are as accessible as possible.
However, this doesn't mean your website will automatically be accessible by just using this library.

When making your website you'll still have to consider accessibility, like giving an input a label. If you're struggling
to make something accessible feel free to open an issue in this repository asking for help, if I have time I could give
it a look.

## Contributing

Todo

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
