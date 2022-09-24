import { Button } from '../button';
import { Dialog } from './dialog';
import { useState } from 'react';

const config = {
	title: 'dialog',
};

enum Open {
	None,
	Modal,
	NonModal,
	Alert,
}

function Simple() {
	const [open, setOpen] = useState<Open>(Open.None);

	function handleButtonClick(v: Open) {
		return function () {
			setOpen(v);
		};
	}

	function onClose() {
		setOpen(Open.None);
	}

	return (
		<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em' } }>
			<Button type="primary" onClick={ handleButtonClick(Open.Modal) }>
				Open dialog (modal)
			</Button>
			<Button onClick={ handleButtonClick(Open.NonModal) }>
				Open dialog (non-modal)
			</Button>
			<Button onClick={ handleButtonClick(Open.Alert) }>
				Open alert dialog
			</Button>

			<Dialog
				title="A modal with text"
				open={ open === Open.Modal }
				onClose={ onClose }
			>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab delectus dignissimos nihil.</p>
			</Dialog>

			<Dialog
				modal={ false }
				title="A non-modal with text"
				open={ open === Open.NonModal }
				onClose={ onClose }
			>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab delectus dignissimos nihil.</p>
			</Dialog>

			<Dialog
				alert
				title="An alert with text"
				open={ open === Open.Alert }
				onClose={ onClose }
			>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab delectus dignissimos nihil.</p>
			</Dialog>
		</div>
	);
}

export { Simple };
export default config;
