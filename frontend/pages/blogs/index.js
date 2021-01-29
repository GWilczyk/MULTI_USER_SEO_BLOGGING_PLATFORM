import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import Card from '../../components/blog/Card';
import Layout from '../../components/Layout';
import { getBlogsCategoriesTags, getPhoto } from '../../actions/blogActions';

const Blogs = ({ blogs, categories, size, tags }) => {
	const showAllBlogs = () => {
		return blogs.map((blog, index) => {
			return (
				<article key={index}>
					<Card blog={blog} />
					<hr />
				</article>
			);
		});
	};

	const showAllCategories = () => {
		return categories.map(({ name, slug }, index) => (
			<Link href={`/categories/${slug}`} key={index}>
				<a className='btn btn-primary mx-1 mt-3'>{name}</a>
			</Link>
		));
	};

	const showAllTags = () => {
		return tags.map(({ name, slug }, index) => (
			<Link href={`/tags/${slug}`} key={index}>
				<a className='btn btn-outline-primary mx-1 mt-3'>{name}</a>
			</Link>
		));
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
						<section className='pb-5 text-center'>
							{showAllCategories()}
							<br />
							{showAllTags()}
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
