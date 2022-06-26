type Nullable<T> = T extends null | undefined ? T : never;

function isNullable<T>(value: T): value is Nullable<T> {
	return value == null;
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
	return !isNullable(value);
}

function isString(value: any): value is string {
	return (typeof value === 'string');
}

function isNode(value: any): value is Node {
	return (value instanceof Node);
}

function isHTMLElement(value: any): value is HTMLElement {
	return (value instanceof HTMLElement);
}

function isHTMLInputElement(value: any): value is HTMLInputElement {
	return (value instanceof HTMLInputElement);
}

function isHTMLButtonElement(value: any): value is HTMLButtonElement {
	return (value instanceof HTMLButtonElement);
}

export {
	isNullable,
	isNonNullable,
	isString,
	isNode,
	isHTMLElement,
	isHTMLInputElement,
	isHTMLButtonElement,
};

