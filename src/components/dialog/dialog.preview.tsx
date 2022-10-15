import { Button } from '../button';
import { Dialog } from './dialog';
import { FormEvent, useId, useRef, useState } from 'react';
import { Input } from '../input';
import { default as EmailIcon } from '../../icons/Mail';

const config = {
	title: 'dialog',
};

const EMAIL_ICON = <EmailIcon />;

enum Open {
	None,
	Modal,
	NonModal,
	Alert,
}

function Simple() {
	const [open, setOpen] = useState<Open>(Open.None);
	const email = useRef('');
	const id = useId();

	function handleButtonClick(v: Open) {
		return function () {
			setOpen(v);
		};
	}

	function onClose() {
		setOpen(Open.None);
	}

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		onClose();
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
				id={ id }
				title="Subscribe to our newsletter"
				open={ open === Open.Alert }
				onClose={ onClose }
				footer={ [
					<Button type="invisible" onClick={ onClose }>
						Cancel
					</Button>,
					<Button htmlType="submit" type="primary" form={ `${ id }-form` }>
						Subscribe
					</Button>,
				] }
			>
				<form id={ `${ id }-form` } onSubmit={ onSubmit }>
					<Input
						aria-label="E-mail"
						icon={ EMAIL_ICON }
						onChange={ (v) => email.current = v.target.value }
						type="email"
						name="email"
						wrapperStyle={ { display: 'block', width: '100%' } }
					/>
				</form>
			</Dialog>
		</div>
	);
}

export { Simple };
export default config;
