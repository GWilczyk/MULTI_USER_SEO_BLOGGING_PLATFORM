import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import { API } from '../../config';
import Layout from '../../components/Layout';
import { getBlogsCategoriesTags } from '../../actions/blogActions';

const Blogs = () => {
	return (
		<Layout>
			<main>
				<div className='container-fluid'>
					<header>
						<div className='col-md-12 pt-3'>
							<h1 className='display-4 font-weight-bold text-center'>
								Programming Blogs and Tutorials
							</h1>
						</div>
						<section>
							<p>Show Categories and Tags</p>
						</section>
					</header>
				</div>

				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>Show All Blogs</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Blogs;
