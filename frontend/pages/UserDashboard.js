import Layout from '../components/Layout';
import Private from '../components/auth/Private';

const UserDashboard = () => {
	return (
		<Layout>
			<Private>
				<h1>User Dashboard</h1>
			</Private>
		</Layout>
	);
};

export default UserDashboard;
