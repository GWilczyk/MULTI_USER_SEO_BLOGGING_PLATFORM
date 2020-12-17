import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const Signup = () => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Layout>
				<h1>Register Page</h1>
				<Link href='/'>
					<a>Home</a>
				</Link>
			</Layout>
		</>
	);
};

export default Signup;
