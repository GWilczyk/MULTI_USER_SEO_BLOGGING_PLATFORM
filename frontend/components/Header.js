import { useState } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from 'reactstrap';

import { APP_NAME } from '../config';
import { isAuth, signout } from '../actions/auth';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(prevState => !prevState);
	const handleSignOut = () => signout(() => Router.push('/auth/signin'));

	return (
		<div>
			<Navbar color='light' light expand='md'>
				<Link href='/'>
					<NavLink className='font-weight-bold' style={{ cursor: 'pointer' }}>
						{APP_NAME}
					</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						<>
							<NavItem>
								<Link href='/blogs'>
									<NavLink style={{ cursor: 'pointer' }}>Blogs</NavLink>
								</Link>
							</NavItem>
						</>

						{!isAuth() && (
							<>
								<NavItem>
									<Link href='/auth/signin'>
										<NavLink style={{ cursor: 'pointer' }}>Login</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href='/auth/signup'>
										<NavLink style={{ cursor: 'pointer' }}>Register</NavLink>
									</Link>
								</NavItem>
							</>
						)}

						{isAuth() && isAuth().role === 0 && (
							<NavItem>
								<Link href='/UserDashboard'>
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && isAuth().role === 1 && (
							<NavItem>
								<Link href='/AdminDashboard'>
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && (
							<NavItem>
								<NavLink onClick={handleSignOut} style={{ cursor: 'pointer' }}>
									Logout
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
