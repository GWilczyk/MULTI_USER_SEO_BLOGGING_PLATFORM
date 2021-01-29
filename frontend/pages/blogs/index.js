import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';

import { API } from '../../config';
import Layout from '../../components/Layout';
import { getBlogsCategoriesTags } from '../../actions/blogActions';

const Blogs = ({ blogs, categories, excerpt, size, tags }) => {
	const showAllBlogs = () => {
		return blogs.map(
			({ excerpt, postedBy: { name }, slug, title, updatedAt }, index) => (
				<article key={index}>
					<div className='lead pb-4'>
						<header>
							<Link href={`/blogs/${slug}`}>
								<a>
									<h2 className='py-3 font-weight-bold'>{title}</h2>
								</a>
							</Link>
						</header>
						<section>
							<p className='mark ml-1 py-2'>
								Written by {name} | Published {moment(updatedAt).fromNow()}
							</p>
						</section>
						<section>
							<p>Blog Categories and Tags</p>
						</section>

						<div className='row'>
							<div className='col-md-4'>Image</div>
							<div className='col-md-8'>
								<section>
									<div className='pb-3'>{renderHTML(excerpt)}</div>
									<Link href={`/blogs/${slug}`}>
										<a className='btn btn-primary pt-2'>Read more</a>
									</Link>
								</section>
							</div>
						</div>
					</div>
					<hr />
				</article>
			)
		);
	};

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
						<div className='col-md-12'>{showAllBlogs()}</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

Blogs.getInitialProps = () => {
	return getBlogsCategoriesTags().then(data => {
		if (data.error) {
			console.log(data.error);
		} else {
			const { blogs, categories, size, tags } = data;
			return {
				blogs,
				categories,
				tags,
				size,
			};
		}
	});
};

export default Blogs;
