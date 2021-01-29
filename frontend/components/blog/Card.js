import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
	const {
		excerpt,
		photo,
		postedBy: { name },
		slug,
		title,
		updatedAt,
	} = blog;

	const showBlogCategories = blog => {
		return blog.categories.map(({ name, slug }, index) => (
			<Link href={`/categories/${slug}`} key={index}>
				<a className='btn btn-primary mx-1 mt-3'>{name}</a>
			</Link>
		));
	};

	const showBlogTags = blog => {
		return blog.tags.map(({ name, slug }, index) => (
			<Link href={`/tags/${slug}`} key={index}>
				<a className='btn btn-outline-primary mx-1 mt-3'>{name}</a>
			</Link>
		));
	};

	return (
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
				{showBlogCategories(blog)}
				{showBlogTags(blog)}
				<br />
			</section>

			<div className='row mt-3'>
				<div className='col-md-4'>
					<section>
						<img
							className='img img-fluid'
							style={{ maxHeight: '150px', width: 'auto' }}
							src={`${API}/blog/photo/${slug}`}
							alt={title}
						/>
					</section>
				</div>

				<div className='col-md-8'>
					<section>
						<div className='pb-3'>
							{excerpt === undefined ? 'rien' : renderHTML(excerpt)}
						</div>
						<Link href={`/blogs/${slug}`}>
							<a className='btn btn-primary pt-2'>Read more</a>
						</Link>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Card;
