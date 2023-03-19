import { Rate } from './rate';
import { Button } from '../button';
import { useId, useState } from 'react';
import { clamp } from '../../utils';
import { default as Plus } from '../../icons/Plus';
import { default as Minus } from '../../icons/Minus';
import { Input } from '../input';
import { Switch } from '../switch';

const config = {
	title: 'rate',
};

function Simple() {
	const [value, setValue] = useState(1);
	const [amount, setAmount] = useState(5);
	const [halves, setHalves] = useState(true);

	const id = useId();
	const id2 = useId();

	function changeValue(add: number) {
		return function () {
			setValue((v) => clamp(v + add, 0, amount));
		};
	}

	function changeAmount(add: number) {
		return function () {
			setAmount((v) => clamp(v + add, 1, 1000));
		};
	}

	return (
		<div>
			<Rate value={ value } amount={ amount } hasHalves={ halves } />
			<br />
			<div>
				<label htmlFor={ id }>Value</label>
				<Input
					id={ id }
					type="number"
					min="0"
					max={ amount }
					step="0.5"
					value={ value }
					onChange={ (e) => setValue(Number(e.target.value)) }
					prefix={ <Button onClick={ changeValue(-1) } icon={ <Minus /> } /> }
					suffix={ <Button onClick={ changeValue(+1) } icon={ <Plus /> } /> }
				/>
			</div>
			<div style={ { marginBlock: '1em' } }>
				<label htmlFor={ id2 }>Value</label>
				<Input
					id={ id2 }
					type="number"
					min="1"
					max="1000"
					step="1"
					value={ amount }
					onChange={ (e) => setAmount(Number(e.target.value)) }
					prefix={ <Button onClick={ changeAmount(-1) } icon={ <Minus /> } /> }
					suffix={ <Button onClick={ changeAmount(+1) } icon={ <Plus /> } /> }
				/>
			</div>
			<label style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1em' } }>
				<span>Enable halves</span>
				<Switch defaultValue={ halves } onChange={ setHalves } />
			</label>
		</div>
	);
}

export { Simple };
export default config;
