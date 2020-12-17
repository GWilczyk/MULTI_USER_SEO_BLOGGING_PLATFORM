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
				<h1>Register Page</h1>

				<SignupComponent />
			</Layout>
		</>
	);
};

export default Signup;
