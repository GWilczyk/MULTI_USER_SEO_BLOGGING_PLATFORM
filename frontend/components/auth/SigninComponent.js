import Router from 'next/router';
import { useState } from 'react';
import { authenticate, signin } from '../../actions/auth';
const INITIAL_STATE = {
	email: '',
	password: '',
	error: '',
	loading: false,
	message: '',
	showForm: true,
};

const SigninComponent = () => {
	const [values, setValues] = useState(INITIAL_STATE);

	const { email, password, error, loading, message, showForm } = values;

	const handleSubmit = event => {
		event.preventDefault();
		setValues(prevState => ({ ...prevState, loading: true, error: '' }));
		const user = { email, password };

		signin(user).then(data => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					loading: false,
					showForm: true,
				});
			} else {
				// Save user token to cookie & user info to localStorage
				// Authenticate user
				authenticate(data, () => Router.push(`/`));
			}
		});
	};

	const handleChange = field => event => {
		event.preventDefault();
		setValues(values => ({
			...values,
			error: '',
			[field]: event.target.value,
		}));
	};

	const showError = () =>
		error ? <div className='alert alert-danger'>{error}</div> : '';

	const showLoading = () =>
		loading ? <div className='alert alert-info'>Loading…</div> : '';

	const showMessage = () =>
		message ? <div className='alert alert-info'>{message}</div> : '';

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						onChange={handleChange('email')}
						type='email'
						value={email}
						className='form-control'
						placeholder='Enter your email'
					/>
				</div>
				<div className='form-group'>
					<input
						onChange={handleChange('password')}
						type='password'
						value={password}
						className='form-control'
						placeholder='Enter your password'
					/>
				</div>
				<div>
					<button className='btn btn-primary'>Login</button>
				</div>
			</form>
		);
	};

	return (
		<>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signinForm()}
		</>
	);
};

export default SigninComponent;
