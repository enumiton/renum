import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { DayOfWeek, toDateISOString } from './date';
import { Calendar } from './calendar';
import { isHTMLInputElement } from '../../utils';
import { Switch } from '../switch';
import type { CalendarProps } from './interface';

const config = {
	title: 'calendar',
	description: '😢',
};

function Simple() {
	const [props, setProps] = useState<Partial<CalendarProps>>({ showOutOfBoundsDate: false, readonly: false });

	return (
		<div>
			<Calendar
				{ ...props }
				firstDayOfWeek={ DayOfWeek.Monday }
			/>
			<fieldset>
				<legend>Settings</legend>
				<div>
					<label>
						<p>Show out of bounds date</p>
						<Switch
							name="show_oob"
							value={ props.showOutOfBoundsDate }
							onChange={ (v) => setProps((prev) => ({ ...prev, showOutOfBoundsDate: v })) }
						/>
					</label>
					<label>
						<p>Readonly</p>
						<Switch
							name="readonly"
							value={ props.readonly }
							onChange={ (v) => setProps((prev) => ({ ...prev, readonly: v })) }
						/>
					</label>
					<label>
						<p>Disabled</p>
						<Switch
							name="disabled"
							value={ props.disabled }
							onChange={ (v) => setProps((prev) => ({ ...prev, disabled: v })) }
						/>
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
