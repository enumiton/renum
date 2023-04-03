import type { FormEvent } from 'react';
import { useId, useRef, useState } from 'react';
import { Button } from '../button';
import { Dialog } from './dialog';
import { Input } from '../input';

const config = {
	title: 'dialog',
};

enum Open {
	None,
	Modal,
	Confirm,
}

type Data = Record<string, FormDataEntryValue>;

function Simple() {
	const id = useId();
	const [open, setOpen] = useState<Open>(Open.None);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Data | null>(null);

	const form = useRef<HTMLFormElement | null>(null);

	function post(formData: FormData) {
		return new Promise<Data>(function (resolve, reject) {
			const result: Data = {};

			for (const [k, v] of formData.entries()) {
				result[k] = v;
			}

			if (Object.keys(result).length <= 0) {
				return reject();
			}

			setTimeout(function () {
				resolve(result);
			}, 2000);
		});
	}

	function handleButtonClick(v: Open) {
		return function () {
			setOpen(v);
		};
	}

	function handleClose() {
		setOpen(Open.None);
	}

	async function handleSubmit(e: FormEvent<HTMLDialogElement>) {
		e.preventDefault();
		e.stopPropagation();

		if (!form.current) {
			return;
		}

		setLoading(true);

		const formData = new FormData(form.current);
		const response = await post(formData);

		form.current.reset();

		setData(response);
		setLoading(false);
		setOpen(Open.None);
	}

	return (
		<div>
			<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em', marginBottom: '1em' } }>
				<Button onClick={ handleButtonClick(Open.Modal) }>
					Open dialog (modal)
				</Button>
				<Button onClick={ handleButtonClick(Open.Confirm) }>
					Open confirm dialog
				</Button>
			</div>
			{ data ? (
				<div>
					<h3>Form data</h3>
					<pre>
						{ JSON.stringify(data, undefined, 2) }
					</pre>
				</div>
			) : null }

			<Dialog.Modal
				title="Create an account"
				open={ open === Open.Modal }
				onClose={ handleClose }
				onConfirm={ handleClose }
				onSubmit={ handleSubmit }
				footer={ [
					<Button
						key="confirm"
						type="primary"
						htmlType="submit"
						form={ id }
						loading={ loading }
						aria-live="polite"
					>
						{ loading ? 'Creating account\u2026' : 'Create account' }
					</Button>,
					<Button key="cancel" type="light" onClick={ handleClose }>
						Cancel
					</Button>,
				] }
			>
				<form
					id={ id }
					ref={ form }
					method="dialog"
				>
					<label htmlFor="username">Username</label>
					<Input
						name="username"
						id="username"
						autoComplete="username"
						required
					/>
					<label htmlFor="email">E-mail</label>
					<Input
						name="email"
						id="email"
						type="email"
						autoComplete="email"
						required
					/>
					<label htmlFor="password">Password</label>
					<Input
						name="password"
						id="password"
						type="password"
						autoComplete="new-password"
						required
					/>
					<label htmlFor="password-confirm">Confirm password</label>
					<Input
						name="password-confirm"
						id="password-confirm"
						type="password"
						autoComplete="new-password"
						required
					/>
				</form>
			</Dialog.Modal>
			<Dialog.Confirm
				title="Remove album from library?"
				open={ open === Open.Confirm }
				actions={ [
					<Button key="confirm" type="primary" onClick={ handleClose }>
						Remove
					</Button>,
					<Button key="cancel" type="light" onClick={ handleClose }>
						Cancel
					</Button>,
				] }
			>
				Removing the album will also remove all associated downloads.
			</Dialog.Confirm>
		</div>
	);
}

export { Simple };
export default config;
