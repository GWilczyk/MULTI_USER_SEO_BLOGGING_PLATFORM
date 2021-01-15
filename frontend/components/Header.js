import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
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

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(prevState => !prevState);
	const handleSignOut = () => signout(() => Router.replace('/signin'));

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
					{isAuth() ? (
						<Nav className='ml-auto' navbar>
							<NavItem>
								<NavLink onClick={handleSignOut} style={{ cursor: 'pointer' }}>
									Logout
								</NavLink>
							</NavItem>
						</Nav>
					) : (
						<Nav className='ml-auto' navbar>
							<NavItem>
								<Link href='/signin'>
									<NavLink style={{ cursor: 'pointer' }}>Login</NavLink>
								</Link>
							</NavItem>
							<NavItem>
								<Link href='/signup'>
									<NavLink style={{ cursor: 'pointer' }}>Register</NavLink>
								</Link>
							</NavItem>
						</Nav>
					)}
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
