import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';

const Signup = () => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Layout>
				<h2 className='text-center py-4'>Register</h2>
				<div className='row'>
					<div className='col-md-6 offset-md-3'>
						<SignupComponent />
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Signup;
