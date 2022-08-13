'use strict';
import { appendFile, mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';

const INPUT = './node_modules/@tabler/icons/icons';
const OUTPUT = './src/icons';
const ICON_INDEX = './src/icons/index.ts';
const ROOT_INDEX = './icons.js';
const TYPE = './icons.d.ts';

const SVG_TAG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">';

const NUM2WORD = {
	'0': 'Zero',
	'1': 'One',
	'2': 'Two',
	'3': 'Three',
	'4': 'Four',
	'5': 'Five',
	'6': 'Six',
	'7': 'Seven',
	'8': 'Eight',
	'9': 'Nine',
};

/**
 * @param {string} name
 * @return {string}
 */
function stringToPascalCase(name) {
	return name
		.split(/[\W\-]+/g)
		.map(function (word) {
			if (word.length <= 0) {
				return '';
			}

			return word[0].toUpperCase() + word.substring(1);
		})
		.join('');
}

(async function generate() {
	console.log('Generating icons');

	await rm(OUTPUT, { recursive: true, force: true });

	await mkdir(OUTPUT);

	const svgs = await readdir(INPUT, 'utf-8');

	for (const file of svgs) {
		if (!file.match(/^(.*).svg$/)) {
			continue;
		}

		let name = stringToPascalCase(file.substring(0, file.lastIndexOf('.')));

		const content = await readFile(`${ INPUT }/${ file }`, 'utf-8');
		const svg = content
			.replace(/<svg .*>/, SVG_TAG)
			.replace(/([\n\r\t])+/g, '');

		// @todo implement svgo

		// If the filename starts with a number, replace it with
		// a written version.
		if (name[0].match(/(\d)/)) {
			name = NUM2WORD[name[0]] + name[1].toUpperCase() + name.substring(2);
		}

		const component = `import { Icon } from '../components/icon';

function ${ name }() {
	return (
		<Icon>
			${ svg }
		</Icon>
	);
}

export default ${ name };`;

		await writeFile(`${ OUTPUT }/${ name }.tsx`, component, 'utf-8');

		await appendFile(ICON_INDEX, `export { default as ${ name } } from './${ name }';\n`, 'utf-8');
	}

	await writeFile(ROOT_INDEX, 'export * from \'./es/icons/index\';', 'utf-8');
	await writeFile(TYPE, 'export * from \'./es/icons/index\';', 'utf-8');

	console.log('Icons generated');
})();
