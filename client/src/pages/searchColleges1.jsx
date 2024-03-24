import { useState } from 'react';
import { Container, Form, Button, Grid, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useLazyQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { saveCollegeIds, getSavedCollegeIds } from '../utils/localStorage';
import { SEARCH_COLLEGES } from '../utils/queries';
import { SAVE_COLLEGE } from '../utils/mutations';
import { generateHashId } from '../utils/helpers'; // Import the unique ID generation function

const SearchColleges = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedColleges, setSearchedColleges] = useState([]); // State to hold processed colleges
    const [savedCollegeIds, setSavedCollegeIds] = useState(getSavedCollegeIds());
    const [saveCollege] = useMutation(SAVE_COLLEGE);
    const [executeSearch, { loading }] = useLazyQuery(SEARCH_COLLEGES, {
        onCompleted: data => {
            // Process the data to include unique IDs
            const processedColleges = data.searchColleges.map(college => ({
                ...college,
                collegeId: generateHashId(college.name, college.city, college.state) // Generate a unique ID
            }));
            setSearchedColleges(processedColleges); // Update the state with processed data
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!searchInput) return;
        executeSearch({ variables: { query: searchInput } });
    };

    const handleSaveCollege = async (collegeId) => {
        console.log(getSavedCollegeIds);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            alert("You must be logged in to save colleges.");
            return false;
        }
    
        const collegeToSave = searchedColleges.find(college => college.collegeId === collegeId);
        if (!collegeToSave) {
            console.error("College to save not found.");
            return;
        }
    
        if (savedCollegeIds.includes(collegeId)) {
            alert("This college has already been saved!");
            return;
        }
    
        try {
            const { name, city, state, size, collegeId: id } = collegeToSave;
            await saveCollege({
                variables: { newCollege: { name, city, state, size, collegeId: id }, token },
            });
    
            setSavedCollegeIds(prevIds => [...new Set([...prevIds, id])]);
            alert("College saved successfully!");
        } catch (err) {
            console.error("Error saving college:", err);
            alert("An error occurred while saving the college.");
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

            {/* <Container>
                <h2 className='pt-5'>
                    {searchedColleges.length
                        ? `Viewing ${searchedColleges.length} results:`
                        : 'Search for a college to begin'}
                </h2>
                <Grid>
                    {searchedColleges.map((college) => {
                        return (
                            <Grid.Column key={college.collegeId} width={8}>
                                <Card>

                                    <Card.Content>
                                        <Card.Header>{college.name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>{college.city}, {college.state}</span>
                                            <span className='date'>{college.size} students</span>
                                            <span className='date'>{college.collegeId}</span>
                                        </Card.Meta>
                                    </Card.Content>
                                    {Auth.loggedIn() && (
                                        <Card.Content extra>
                                            <Button
                                                fluid
                                                color='blue'
                                                disabled={savedCollegeIds?.some((savedCollegeId) => savedCollegeId === college.collegeId)}
                                                onClick={() => handleSaveCollege(college.collegeId)}>
                                                {savedCollegeIds?.some((savedCollegeId) => savedCollegeId === college.collegeId)
                                                    ? 'This college has already been saved!'
                                                    : 'Save this college!'}
                                            </Button>
                                        </Card.Content>
                                    )}
                                </Card>
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </Container> */}

            <Container>
                <h2 className='pt-5'>
                    {loading ? 'Loading...' : `${searchedColleges.length ? `Viewing ${searchedColleges.length} results:` : 'Search for a college to begin'}`}
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
                                            disabled={savedCollegeIds.includes(college.collegeId)}
                                            onClick={() => handleSaveCollege(college.collegeId)}> {/* Pass only the collegeId */}
                                            {savedCollegeIds.includes(college.collegeId) ? 'This college has already been saved!' : 'Save this college!'}
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
