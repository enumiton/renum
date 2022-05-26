function capitalize(str: string) {
	return str
		.split(' ')
		.map(function (word) {
			if (word.length <= 0) {
				return '';
			}

			return word[0]!.toUpperCase() + word.substring(1);
		})
		.join(' ');
}

export { capitalize };
