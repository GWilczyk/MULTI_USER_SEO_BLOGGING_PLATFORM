import { useState } from 'react';
import { signup } from '../../actions/auth';

const SignupComponent = () => {
	const [values, setValues] = useState({
		name: 'John',
		email: 'john@gmail.com',
		password: 'test1234',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	const { name, email, password, error, loading, message, showForm } = values;

	const handleSubmit = async event => {
		event.preventDefault();
		setValues(prevState => ({ ...prevState, loading: true, error: '' }));
		const user = { email, name, password };

		try {
			const result = await signup(user);

			setValues(prevState => ({
				...prevState,
				name: '',
				email: '',
				password: '',
				error: '',
				loading: false,
				message: result.message,
				showForm: false,
			}));
		} catch (error) {
			setValues(prevState => ({
				...prevState,
				error: error.message,
				loading: false,
			}));
		}
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

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						onChange={handleChange('name')}
						type='text'
						value={name}
						className='form-control'
						placeholder='Enter your name'
					/>
				</div>
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
					<button className='btn btn-primary'>Sign Up</button>
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
