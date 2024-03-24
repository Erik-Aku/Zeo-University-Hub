import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Container, Menu, Image, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const AppNavbar = () => {
	return (
		<Menu inverted>
			<Container
				style={{
					width: '100%',
					paddingLeft: '20px',
					paddingRight: '20px'
				}}
			>
				<Menu.Item>
					<Image
						src='/Zeo-Logo.png'
						alt='profilePicture'
						style={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'center',
							width: '100px'
						}}
					/>
				</Menu.Item>

				<Menu.Item
					header
					style={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<Header as='h1' inverted style={{ margin: '0 auto' }}>
						Zeo University Hub
					</Header>
				</Menu.Item>

				<Menu.Menu position='right'>
					<Menu.Item as={Link} to='/' name='home'>
						Home
					</Menu.Item>

					{Auth.loggedIn() ? (
						<>
							<Menu.Item
								as={Link}
								to='/saved'
								name='savedColleges'
							>
								Saved Colleges
							</Menu.Item>
							<Menu.Item onClick={Auth.logout} name='logout'>
								Logout
							</Menu.Item>
						</>
					) : (
						<>
							<Menu.Item as={Link} to='/login' name='login'>
								Login
							</Menu.Item>
							<Menu.Item as={Link} to='/signup' name='signup'>
								Signup
							</Menu.Item>
						</>
					)}
				</Menu.Menu>
			</Container>
		</Menu>
	);
};

export default AppNavbar;
