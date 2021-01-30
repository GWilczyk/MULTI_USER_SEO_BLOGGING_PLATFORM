import Link from 'next/link';

const showBlogCategories = blog => {
	return blog.categories.map(({ name, slug }, index) => (
		<Link href={`/categories/${slug}`} key={index}>
			<a className='btn btn-primary mx-1 mt-3'>{name}</a>
		</Link>
	));
};

export default showBlogCategories;
