import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';

import { API, DOMAIN, APP_NAME } from '../../config';
import showBlogCategories from '../../helpers/showBlogCategories';
import showBlogTags from '../../helpers/showBlogTags';

import Layout from '../../components/Layout';
import { getBlog } from '../../actions/blogActions';

const SingleBlog = ({ blog, query }) => {
	const {
		body,
		mdesc,
		postedBy: { name },
		slug,
		title,
		updatedAt,
	} = blog;

	const head = () => (
		<Head>
			<title>
				{title} | {APP_NAME}
			</title>
			<meta name='description' content={mdesc} />
			<link rel='canonical' href={`${DOMAIN}/blogs/${query.slug}`} />
			<meta property='og:title' content={`${title} | ${APP_NAME}`} />
			<meta property='og:description' content={mdesc} />
			<meta property='og:type' content='website' />
			<meta property='og:url' content={`${DOMAIN}/blogs/${query.slug}`} />
			<meta property='og:site_name' content={`${APP_NAME}`} />

			<meta property='og:image' content={`${API}/blog/photo/${slug}`} />
			<meta
				property='og:image:secure_url'
				content={`${API}/blog/photo/${slug}`}
			/>
			<meta property='og:image:type' content='image/jpg' />
		</Head>
	);

	return (
		<>
			{head()}
			<Layout>
				<main>
					<article>
						<div className='container-fluid'>
							<section>
								<div className='row' style={{ marginTop: '-30px' }}>
									<img
										alt={title}
										src={`${API}/blog/photo/${slug}`}
										className='img img-fluid featured-image'
									/>
								</div>
							</section>

							<section>
								<div className='container'>
									<h1 className='display-2 py-3 text-center font-weight-bold'>
										{title}
									</h1>
									<p className='lead mt-3 mark'>
										Written by {name} | Published {moment(updatedAt).fromNow()}
									</p>

									<div className='pb-3'>
										{showBlogCategories(blog)}
										{showBlogTags(blog)}
									</div>
								</div>
							</section>
						</div>

						<div className='container'>
							<section>
								<div className='col-md-12 lead'>{renderHTML(body)}</div>
							</section>
						</div>

						<div className='container pb-5'>
							<h4 className='text-center py-5 h2'>Related Blogs</h4>
							<hr />
							<p>show related blogs</p>
						</div>

						<div className='container pb-5'>
							<p>show comments</p>
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
			return { blog: data, query };
		}
	});
};

export default SingleBlog;
