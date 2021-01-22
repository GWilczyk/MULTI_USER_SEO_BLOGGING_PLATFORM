import Link from 'next/link';
import Admin from '../components/auth/Admin';
import Layout from '../components/Layout';

const AdminDashboard = () => {
	return (
		<Layout>
			<Admin>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12 py-3'>
							<h2>Admin Dashboard</h2>
						</div>

						<div className='col-md-4 py-5'>
							<ul className='list-group'>
								<li className='list-group-item'>
									<Link href='/crud/CategoryTagCRUD'>Create Category</Link>
								</li>

								<li className='list-group-item'>
									<Link href='/crud/CategoryTagCRUD'>Create Tag</Link>
								</li>

								<li className='list-group-item'>
									<Link href='/crud/BlogCRUD'>Create Blog</Link>
								</li>
							</ul>
						</div>

						<div className='col-md-8 py-5'>right</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default AdminDashboard;
