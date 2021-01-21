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

						<div className='col-md-4 py-5' style={{ backgroundColor: 'red' }}>
							<ul className='list-group'>
								<li className='list-group-item'>
									<Link href='/crud/CategoryTag'>Create Category</Link>
								</li>

								<li className='list-group-item'>
									<Link href='/crud/CategoryTag'>Create Tag</Link>
								</li>
							</ul>
						</div>

						<div
							className='col-md-8 py-5'
							style={{ backgroundColor: 'blue', color: '#fff' }}
						>
							right
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default AdminDashboard;
