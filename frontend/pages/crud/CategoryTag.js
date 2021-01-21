import Admin from '../../components/auth/Admin';
import Category from '../../components/crud/Category';
import Layout from '../../components/Layout';

const CategoryTag = () => {
	return (
		<Layout>
			<Admin>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<h2>Manage Categories and Tags</h2>
						</div>
						<div className='col-md-6 py-5' style={{ backgroundColor: 'red' }}>
							<p>Categories</p>
							<Category />
						</div>
						<div className='col-md-6 py-5' style={{ backgroundColor: 'blue' }}>
							<p>Tag</p>
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default CategoryTag;
