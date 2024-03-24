import { useState } from 'react';
import { Container, Form, Button, Grid, Card, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Auth from '../utils/auth';
import { saveCollegeIds, getSavedCollegeIds } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_COLLEGES } from '../utils/queries'; // Make sure this query is defined in your queries file
import { SAVE_COLLEGE } from '../utils/mutations';

const SearchColleges = () => {
    const [searchInput, setSearchInput] = useState('');
    const [savedCollegeIds, setSavedCollegeIds] = useState(getSavedCollegeIds());
    const [saveCollege, { error }] = useMutation(SAVE_COLLEGE);

    const { loading, data } = useQuery(SEARCH_COLLEGES);

    const searchedColleges = data?.searchColleges || [];

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!searchInput) {
            return false;
        }
    };

    const handleSaveCollege = async (collegeId) => {
        const collegeToSave = searchedColleges.find(college => college.collegeId === collegeId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await saveCollege({
                variables: { collegeId: collegeToSave.collegeId },
            });
            setSavedCollegeIds([...savedCollegeIds, collegeToSave.collegeId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="ui inverted segment text-light bg-dark p-5">
                <Container>
                    <h1>Search for Colleges!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Grid>
                            <Grid.Column width={10}>
                                <Form.Input
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    placeholder='Search for a college'
                                    fluid
                                />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Button type='submit' color='green'>
                                    Submit Search
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Container>
            </div>

            <Container>
                <h2 className='pt-5'>
                    {searchedColleges.length
                        ? `Viewing ${searchedColleges.length} results:`
                        : 'Search for a college to begin'}
                </h2>
                <Grid>
                    {searchedColleges.map((college) => (
                        <Grid.Column key={college.collegeId} width={8}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>{college.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{college.city}, {college.state}</span>
                                        <span className='date'>{college.size} students</span>
                                    </Card.Meta>
                                </Card.Content>
                                {Auth.loggedIn() && (
                                    <Card.Content extra>
                                        <Button
                                            fluid
                                            color='blue'
                                            disabled={savedCollegeIds.some(savedCollegeId => savedCollegeId === college.collegeId)}
                                            onClick={() => handleSaveCollege(college.collegeId)}>
                                            {savedCollegeIds.some(savedCollegeId => savedCollegeId === college.collegeId)
                                                ? 'This college has already been saved!'
                                                : 'Save this college!'}
                                        </Button>
                                    </Card.Content>
                                )}
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default SearchColleges;
