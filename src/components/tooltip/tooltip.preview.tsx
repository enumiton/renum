import { default as UserIcon } from '../../icons/UserX';
import { Tooltip } from './tooltip';
import { Button } from '../button';
import { Radio } from '../radio';
import type { FormEvent } from 'react';
import { useState } from 'react';
import type { PortalAlign, PortalAlignOffset } from '../portal';
import { isHTMLInputElement } from '../../utils';

const config = {
	title: 'tooltip',
};

const USER_ICON = <UserIcon />;

function Simple() {
	const [align, setAlign] = useState<[PortalAlign, PortalAlignOffset]>(['bottom', 'center']);

	function handlePlacementChange(e: FormEvent<HTMLFieldSetElement>) {
		if (isHTMLInputElement(e.target)) {
			setAlign([e.target.value as PortalAlign, align[1]]);
		}
	}

	function handleOffsetChange(e: FormEvent<HTMLFieldSetElement>) {
		if (isHTMLInputElement(e.target)) {
			setAlign([align[0], e.target.value as PortalAlignOffset]);
		}
	}

	return (
		<div>
			<div style={ { width: '100%', textAlign: 'center', marginBottom: '2em' } }>
				<Tooltip
					label="Delete user"
					icon={ USER_ICON }
					align={ align }
					primaryLabel
				>
					<Button
						icon={ USER_ICON }
					/>
				</Tooltip>
			</div>
			<form>
				<fieldset onChange={ handlePlacementChange }>
					<legend>Placement</legend>
					<Radio name="placement" value="top" label="Top" />
					<Radio name="placement" value="bottom" label="Bottom" />
					<Radio name="placement" value="right" label="Right" />
					<Radio name="placement" value="left" label="Left" />
				</fieldset>
				<fieldset onChange={ handleOffsetChange }>
					<legend>Offset</legend>
					<Radio name="offset" value="start" label="Start" />
					<Radio name="offset" value="center" label="Center" />
					<Radio name="offset" value="end" label="End" />
				</fieldset>
			</form>
		</div>
	);
}

export { Simple };
export default config;
