import Admin from '../../components/auth/Admin';
import Category from '../../components/crud/Category';
import Layout from '../../components/Layout';
import Tag from '../../components/crud/Tag';

const CategoryTagCRUD = () => {
	return (
		<Layout>
			<Admin>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12 py-3'>
							<h2>Manage Categories and Tags</h2>
						</div>
						<div className='col-md-6 py-5'>
							<p>Categories</p>
							<Category />
						</div>
						<div className='col-md-6 py-5'>
							<p>Tag</p>
							<Tag />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default CategoryTagCRUD;
