import Admin from '../../components/auth/Admin';
import BlogCreate from '../../components/crud/BlogCreate';
import Layout from '../../components/Layout';

const BlogCRUD = () => {
	return (
		<Layout>
			<Admin>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12 py-3'>
							<h2>Create New Blog</h2>
						</div>
						<div className='col-md-12 py-5'>
							<BlogCreate />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default BlogCRUD;
