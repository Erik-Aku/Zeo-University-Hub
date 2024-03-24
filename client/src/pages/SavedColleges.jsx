import { Container, Card, Button, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Auth from '../utils/auth';
import { removeCollegeId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries/';
import { REMOVE_COLLEGE } from '../utils/mutations';

const SavedColleges = () => {
	const { data, error: queryError } = useQuery(GET_ME);
	const [removeCollege, { error: mutationError }] = useMutation(REMOVE_COLLEGE);
	const userData = data?.me || {};

	// create function that accepts the college's mongo _id value as param and deletes the college from the database
	const handleRemoveCollege = async (collegeId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			await removeCollege({
				variables: { collegeId }
			});
			removeCollegeId(collegeId);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className='text-light bg-dark p-5'>
				<Container>
					<h1>Viewing saved colleges!</h1>
				</Container>
			</div>
			<Container>
				<h2 className='pt-5'>
					{userData?.SavedColleges?.length
						? `Viewing ${userData.SavedColleges.length} saved ${
								userData.SavedColleges.length === 1
									? 'college'
									: 'colleges'
						  }`
						: 'You have no saved colleges!'}
				</h2>
				<Grid>
					{userData?.SavedColleges?.map((college) => (
						<Grid.Column key={college.collegeId} width={4}>
							<Card>
								{college.image && (
									<Image
										src={college.image}
										wrapped
										ui={false}
										alt={`The cover for ${college.title}`}
									/>
								)}
								<Card.Content>
									<Card.Header>{college.name}</Card.Header>
								</Card.Content>
								<Card.Content extra>
									<Button
										basic
										color='red'
										onClick={() =>
											handleRemoveCollege(
												college.collegeId
											)
										}
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
