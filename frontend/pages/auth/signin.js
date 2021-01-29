import Layout from '../../components/Layout';
import SigninComponent from '../../components/auth/SigninComponent';

const Signin = () => {
	return (
		<Layout>
			<h2 className='text-center py-4'>Login</h2>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<SigninComponent />
				</div>
			</div>
		</Layout>
	);
};

export default Signin;
