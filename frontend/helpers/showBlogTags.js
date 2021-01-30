import Link from 'next/link';

const showBlogTags = blog => {
	return blog.tags.map(({ name, slug }, index) => (
		<Link href={`/tags/${slug}`} key={index}>
			<a className='btn btn-outline-primary mx-1 mt-3'>{name}</a>
		</Link>
	));
};

export default showBlogTags;
