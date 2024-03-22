import { useState, useEffect } from 'react';
import { Container, Form, Button, Grid, Card, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Auth from '../utils/auth';
import { saveCollege, searchColleges } from '../utils/API';
import { saveCollegeIds, getSavedCollegeIds } from '../utils/localStorage';
import { SAVE_College } from '../utils/mutations';

const SearchColleges = () => {
    const [searchedColleges, setSearchedColleges] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedCollegeIds, setSavedCollegeIds] = useState(
        getSavedCollegeIds()
    );

    useEffect(() => {
        return () => saveCollegeIds(savedCollegeIds);
    });

    // create method to search for Colleges and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const collegeResults = await searchColleges(searchInput);

            console.log(collegeResults);
            const collegeData = collegeResults.map((college) => ({
                collegeId: college.id,
                name: college.name,
                city: college.city,
                state: college.state,
                size: college.size
            }));

            setSearchedColleges(collegeData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // create function to handle saving a college to our database
    const handleSaveCollege = async (collegeId) => {
        // find the college in `searchedColleges` state by the matching id
        const collegeToSave = searchedColleges.find(
            (college) => college.collegeId === collegeId
        );
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await SAVE_College(collegeToSave, token);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            // if college successfully saves to user's account, save college id to state
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
                    {searchedColleges.map((college) => {
                        return (
                            <Grid.Column key={college.collegeId} width={8}>
                                <Card>
                                    {/* {college.image && (
                                        <Image src={college.image} wrapped ui={false} alt={`The cover for ${college.title}`} />
                                    )} */}
                                    <Card.Content>
                                        <Card.Header>{college.name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>{college.city}, {college.state}</span>
                                            <span className='date'>{college.size} students</span>
                                            {/* <span className='date'>{college.collegeId}</span> */}
                                        </Card.Meta>
                                        {/* <Card.Description>{college.description}</Card.Description> */}
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
            </Container>
        </>
    );

};

export default SearchColleges;
