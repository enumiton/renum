import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { DayOfWeek, toDateISOString } from './date';
import { Calendar } from './calendar';
import { isHTMLInputElement } from '../../utils';
import { Switch } from '../switch';

const config = {
	title: 'calendar',
	description: '😢',
};

function Simple() {
	const [oob, setOob] = useState(false);

	return (
		<div>
			<Calendar
				showOutOfBoundsDate={ oob }
				firstDayOfWeek={ DayOfWeek.Monday }
			/>
			<fieldset>
				<legend>Settings</legend>
				<div>
					<label>
						<p>Show out of bounds date</p>
						<Switch name="show_oob" value={ oob } onChange={ setOob } />
					</label>
				</div>
			</fieldset>
		</div>
	);
}

function Stateful() {
	const [value, setValue] = useState(new Date());

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		if (!isHTMLInputElement(e.target)) {
			return;
		}

		const next = new Date(e.target.value);

		if (next.toString() !== 'Invalid Date') {
			setValue(next);
		}
	}

	return (
		<div>
			<label>
				Selected date<br />
				<input type="text" value={ toDateISOString(value) } onChange={ handleInputChange } />
			</label>
			<Calendar
				value={ value }
				onChange={ setValue }
				firstDayOfWeek={ DayOfWeek.Monday }
			/>
		</div>
	);
}

export default config;
export { Stateful, Simple };
