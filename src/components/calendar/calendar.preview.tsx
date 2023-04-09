import { DayOfWeek } from './date';
import { Calendar } from './calendar';

const config = {
	title: 'calendar',
	description: '😢',
};

function Simple() {
	return (
		<div>
			<Calendar
				firstDayOfWeek={ DayOfWeek.Monday }
				onChange={ console.log }
			/>
		</div>
	);
}

export default config;
export { Simple };
