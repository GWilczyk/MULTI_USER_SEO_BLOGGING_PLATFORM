import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const Index = () => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Layout>
				<h1>Home Page</h1>
				<Link href='/signin'>
					<a>Login</a>
				</Link>
			</Layout>
		</>
	);
};

export default Index;
