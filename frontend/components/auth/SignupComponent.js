import { useState } from 'react';

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

	const handleSubmit = event => {
		event.preventDefault();
		console.table({ name, email, password, error, loading, message, showForm });
	};

	const handleChange = field => event => {
		event.preventDefault();
		setValues(values => ({
			...values,
			error: false,
			[field]: event.target.value,
		}));
	};

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

	return <>{signupForm()}</>;
};

export default SignupComponent;
