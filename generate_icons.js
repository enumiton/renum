import { appendFile, mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';

const INPUT = './node_modules/@tabler/icons/icons';
const OUTPUT = './src/icons';
const ICON_INDEX = './src/icons/index.ts';
const ROOT_INDEX = './icons.js';
const TYPE = './icons.d.ts';

/**
 * @param {string} name 
 */
function strip(name) {
	let result = name.replace(/(\W|-)+/g, ' ');

	return result.split(' ')
		.map(function (word) {
			if (word.length <= 0) {
				return '';
			}

			return word[0].toUpperCase() + word.substring(1);
		})
		.join('');
}

async function generate() {
	console.log("Generating icons");

	await rm(OUTPUT, { recursive: true, force: true });

	await mkdir(OUTPUT);

	const svgs = await readdir(INPUT);

	for (const file of svgs) {
		if (!file.match(/^(.*).svg$/)) {
			continue;
		}

		let name = strip(file.substring(0, file.lastIndexOf('.')));
		const content = await readFile(`${INPUT}/${file}`, 'utf-8');
		const svg = content
			.replace(
				/<svg .*>/,
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
			)
			.replace(/(\n|\r|\t)+/g, '');

		// @todo implement svgo

		if (name[0].match(/(\d)/)) {
			name = 'A' + name;
		}

		const component = `import { Icon } from '../components/icon';

function ${name}() {
	return (
		<Icon>
			${svg}
		</Icon>
	);
}

export default ${name};`;

		await writeFile(`${OUTPUT}/${name}.tsx`, component, 'utf-8');

		await appendFile(ICON_INDEX, `export { default as ${name} } from './${name}';\n`);
	}

	await writeFile(ROOT_INDEX, "export * from './es/icons/index'");
	await writeFile(TYPE, "export * from './es/icons/index'");

	console.log('Icons generated');
}

generate();
