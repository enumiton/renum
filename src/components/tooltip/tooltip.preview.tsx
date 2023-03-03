import { default as UserIcon } from '../../icons/UserX';
import { Tooltip } from './tooltip';
import { Button } from '../button';
import { Radio } from '../radio';
import type { FormEvent } from 'react';
import { useState } from 'react';
import type { PortalAlign, PortalAlignOffset } from '../portal';
import { isHTMLInputElement } from '../../utils';
import type { PortalAlignSide } from '../portal/interface.js';

const config = {
	title: 'tooltip',
};

const USER_ICON = <UserIcon />;

function Simple() {
	const [[lhs, rhs], setAlign] = useState<[PortalAlignSide, PortalAlignOffset]>(['bottom', 'center']);

	function handlePlacementChange(e: FormEvent<HTMLFieldSetElement>) {
		if (isHTMLInputElement(e.target)) {
			setAlign([e.target.value as PortalAlignSide, rhs]);
		}
	}

	function handleOffsetChange(e: FormEvent<HTMLFieldSetElement>) {
		if (isHTMLInputElement(e.target)) {
			setAlign([lhs, e.target.value as PortalAlignOffset]);
		}
	}

	return (
		<div>
			<div style={ { width: '100%', textAlign: 'center', marginBottom: '2em' } }>
				<Tooltip
					label="Delete user"
					icon={ USER_ICON }
					align={ `${ lhs }-${ rhs }` as PortalAlign }
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
					<Radio name="placement" value="top">
						Top
					</Radio>
					<Radio name="placement" value="bottom">
						Bottom
					</Radio>
					<Radio name="placement" value="right">
						Right
					</Radio>
					<Radio name="placement" value="left">
						Left
					</Radio>
				</fieldset>
				<fieldset onChange={ handleOffsetChange }>
					<legend>Offset</legend>
					<Radio name="offset" value="start">
						Start
					</Radio>
					<Radio name="offset" value="center">
						Center
					</Radio>
					<Radio name="offset" value="end">
						End
					</Radio>
				</fieldset>
			</form>
		</div>
	);
}

export { Simple };
export default config;
