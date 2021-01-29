import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { API, DOMAIN, APP_NAME } from '../../config';

import Layout from '../../components/Layout';
import { getBlog } from '../../actions/blogActions';

const SingleBlog = ({ blog, router }) => {
	return (
		<>
			<Layout>
				<main>
					<article>
						<div className='container-fluid'>
							<section>{JSON.stringify(blog)}</section>
						</div>
					</article>
				</main>
			</Layout>
		</>
	);
};

SingleBlog.getInitialProps = ({ query }) => {
	return getBlog(query.slug).then(data => {
		if (data.error) {
			console.log(data.error);
		} else {
			console.log('GET INITIAL PROPS IN SINGLEBLOG: ', data);
			return { blog: data };
		}
	});
};

export default withRouter(SingleBlog);
