import Router from 'next/router';
import { useEffect, useState } from 'react';
import { authenticate, isAuth, signin } from '../../actions/auth';

const INITIAL_STATE = {
	email: '',
	error: '',
	loading: false,
	message: '',
	password: '',
	showForm: true,
};

const SigninComponent = () => {
	const [values, setValues] = useState(INITIAL_STATE);

	const { email, error, loading, message, password, showForm } = values;

	useEffect(() => {
		if (isAuth() && isAuth().role === 1) {
			Router.push('/AdminDashboard');
		} else if (isAuth() && isAuth().role !== 1) {
			Router.push('/UserDashboard');
		} else {
			Router.push('/auth/signin');
		}
	}, []);

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
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push('/AdminDashboard');
					} else {
						Router.push('/UserDashboard');
					}
				});
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
