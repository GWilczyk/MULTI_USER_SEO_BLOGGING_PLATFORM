import { useState } from 'react';
import { signup } from '../../actions/auth';
const INITIAL_STATE = {
	name: '',
	email: '',
	password: '',
	error: '',
	loading: false,
	message: '',
	showForm: true,
};

const SignupComponent = () => {
	const [values, setValues] = useState(INITIAL_STATE);

	const { name, email, password, error, loading, message, showForm } = values;

	const handleSubmit = event => {
		event.preventDefault();
		setValues(prevState => ({ ...prevState, loading: true, error: '' }));

		const user = { email, name, password };

		signup(user).then(data => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					loading: false,
					showForm: true,
				});
			} else {
				setValues({
					...values,
					...INITIAL_STATE,
					message: data.message,
					showForm: false,
				});
			}
		});
	};

	const handleChange = event => {
		event.preventDefault();
		const { name, value } = event.target;
		setValues(values => ({
			...values,
			error: '',
			[name]: value,
		}));
	};

	const showError = () =>
		error ? <div className='alert alert-danger'>{error}</div> : '';

	const showLoading = () =>
		loading ? <div className='alert alert-info'>Loading…</div> : '';

	const showMessage = () =>
		message ? <div className='alert alert-info'>{message}</div> : '';

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						onChange={handleChange}
						type='text'
						name='name'
						value={name}
						className='form-control'
						placeholder='Enter your name'
					/>
				</div>
				<div className='form-group'>
					<input
						onChange={handleChange}
						type='email'
						name='email'
						value={email}
						className='form-control'
						placeholder='Enter your email'
					/>
				</div>
				<div className='form-group'>
					<input
						onChange={handleChange}
						type='password'
						name='password'
						value={password}
						className='form-control'
						placeholder='Enter your password'
					/>
				</div>
				<div>
					<button className='btn btn-primary'>Signup</button>
				</div>
			</form>
		);
	};

	return (
		<>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signupForm()}
		</>
	);
};

export default SignupComponent;
