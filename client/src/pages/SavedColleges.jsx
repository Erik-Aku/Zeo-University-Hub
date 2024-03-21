import { useState, useEffect } from 'react';
import { Container, Card, Button, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { getMe, deleteCollege } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedColleges = () => {
	const [userData, setUserData] = useState({});

	// use this to determine if `useEffect()` hook needs to run again
	const userDataLength = Object.keys(userData).length;

	useEffect(() => {
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;

				if (!token) {
					return false;
				}

				const response = await getMe(token);

				if (!response.ok) {
					throw new Error('something went wrong!');
				}

				const user = await response.json();
				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
	}, [userDataLength]);

	// create function that accepts the college's mongo _id value as param and deletes the college from the database
	const handleDeleteCollege = async (collegeId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const response = await deleteCollege(collegeId, token);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const updatedUser = await response.json();
			setUserData(updatedUser);
			// upon success, remove college's id from localStorage
			removeBookId(collegeId);
		} catch (err) {
			console.error(err);
		}
	};

	// if data isn't here yet, say so
	if (!userDataLength) {
		return <h2>LOADING...</h2>;
	}

	return (
		<>
			<div className='text-light bg-dark p-5'>
				<Container>
					<h1>Viewing saved colleges!</h1>
				</Container>
			</div>
			<Container>
				<h2 className='pt-5'>
					{userData.SavedColleges.length
						? `Viewing ${userData.SavedColleges.length} saved ${
								userData.SavedColleges.length === 1 ? 'college' : 'colleges'
						  }`
						: 'You have no saved colleges!'}
				</h2>
				<Grid>
					{userData.SavedColleges.map((college) => (
						<Grid.Column key={college.collegeId} width={4}>
							<Card>
								{college.image && (
									<Image src={college.image} wrapped ui={false} alt={`The cover for ${college.title}`} />
								)}
								<Card.Content>
									<Card.Header>{college.name}</Card.Header>
								</Card.Content>
								<Card.Content extra>
									<Button
										basic
										color='red'
										onClick={() => handleDeleteCollege(college.collegeId)}
									>
										Delete this college!
									</Button>
								</Card.Content>
							</Card>
						</Grid.Column>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default SavedColleges;
