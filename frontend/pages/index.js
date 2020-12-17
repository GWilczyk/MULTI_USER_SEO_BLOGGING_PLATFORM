import Head from 'next/head';
import Layout from '../components/Layout';

const Index = () => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Layout>
				<h1>Index Page</h1>
			</Layout>
		</>
	);
};

export default Index;
