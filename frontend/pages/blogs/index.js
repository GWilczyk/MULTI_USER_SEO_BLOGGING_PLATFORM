import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { API, DOMAIN, APP_NAME } from '../../config';

import Card from '../../components/blog/Card';
import Layout from '../../components/Layout';
import { getBlogsCategoriesTags } from '../../actions/blogActions';

const Blogs = ({
	blogs,
	blogsLimit,
	blogsSkip,
	categories,
	router,
	tags,
	totalBlogs,
}) => {
	const [limit, setLimit] = useState(blogsLimit);
	const [loadedBlogs, setLoadedBlogs] = useState([]);
	const [size, setSize] = useState(totalBlogs);
	const [skip, setSkip] = useState(blogsSkip);

	const head = () => (
		<Head>
			<title>Programming blogs | {APP_NAME}</title>
			<meta
				name='description'
				content='Programming blogs and tutorials on React, Node, Next and Web Development'
			/>
			<link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
			<meta
				property='og:title'
				content={`Latest Web Development Tutorials | ${APP_NAME}`}
			/>
			<meta
				property='og:description'
				content='Programming blogs and tutorials on React, Node, Next and Web Development'
			/>
			<meta property='og:type' content='website' />
			<meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
			<meta property='og:site_name' content={`${APP_NAME}`} />
			<meta
				property='og:image'
				content={`${DOMAIN}/static/images/seo_image.jpg`}
			/>
			<meta
				property='og:image:secure_url'
				content={`${DOMAIN}/static/images/seo_image.jpg`}
			/>
			<meta property='og:image:type' content='image/jpg' />
		</Head>
	);

	const loadMore = () => {
		let loadFrom = skip + limit;
		getBlogsCategoriesTags(limit, loadFrom).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoadedBlogs(loadedBlogs => [...loadedBlogs, ...data.blogs]);
				setSize(size => data.size);
				setSkip(skip => loadFrom);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button
					className='btn btn-outline-info btn-lg mt-2 mb-5'
					onClick={loadMore}
				>
					Load More
				</button>
			)
		);
	};

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

	const showLoadedBlogs = () => {
		return loadedBlogs.map((blog, index) => {
			return (
				<article key={index}>
					<Card blog={blog} />
					<hr />
				</article>
			);
		});
	};

	return (
		<>
			{head()}
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

					<div className='container-fluid '>{showAllBlogs()}</div>
					<div className='container-fluid'>{showLoadedBlogs()}</div>
					<div className='text-center py-5'>{loadMoreButton()}</div>
				</main>
			</Layout>
		</>
	);
};

Blogs.getInitialProps = () => {
	let limit = 2;
	let skip = 0;
	return getBlogsCategoriesTags(limit, skip).then(data => {
		if (data.error) {
			console.log(data.error);
		} else {
			const { blogs, categories, size, tags } = data;
			return {
				blogs,
				blogsLimit: limit,
				blogsSkip: skip,
				categories,
				tags,
				totalBlogs: size,
			};
		}
	});
};

export default withRouter(Blogs);
