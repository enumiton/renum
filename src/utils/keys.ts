/** @internal */
const enum Key {
	None,
	Space,
	Enter,
	Escape,
	Backspace,
	Delete,
	Clear,
	Up,
	Down,
	Left,
	Right,
	Home,
	End,
	PageUp,
	PageDown,
}

/** @internal */
function getKey(input: string): Key {
	switch (input.toLowerCase()) {
		case ' ':
		case 'space':
		case 'spacebar':
			return Key.Space;

		case 'enter':
		case 'return':
			return Key.Enter;

		case 'esc':
		case 'escape':
			return Key.Escape;

		case 'backspace':
			return Key.Backspace;

		case 'del':
		case 'delete':
			return Key.Delete;

		case 'clear':
			return Key.Clear;

		case 'up':
		case 'arrowup':
			return Key.Up;

		case 'down':
		case 'arrowdown':
			return Key.Down;

		case 'left':
		case 'arrowleft':
			return Key.Left;

		case 'right':
		case 'arrowright':
			return Key.Right;

		case 'home':
			return Key.Home;

		case 'end':
			return Key.End;

		case 'pageup':
			return Key.PageUp;

		case 'pagedown':
			return Key.PageDown;

		default:
			return Key.None;
	}
}

export { Key, getKey };
