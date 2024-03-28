// Import necessary hooks and components for handling the search functionality
import { useState, useEffect } from 'react';
import { Container, Form, Button, Grid, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

// Import authentication utilities and local storage handlers
import Auth from '../utils/auth';
import { saveCollegeIds, getSavedCollegeIds } from '../utils/localStorage';

// Import GraphQL queries and mutations
import { GET_ME, SEARCH_COLLEGES } from '../utils/queries';
import { SAVE_COLLEGE } from '../utils/mutations';

// Import helper function for generating unique IDs
import { generateHashId } from '../utils/helpers';

// Define the SearchColleges component
const SearchColleges = () => {
    // State hooks for managing search input and results
    const [searchInput, setSearchInput] = useState('');
    const [searchedColleges, setSearchedColleges] = useState([]);
    const [savedCollegeIds, setSavedCollegeIds] = useState([]);

    // Initialize the SAVE_COLLEGE mutation and the SEARCH_COLLEGES lazy query
    const [saveCollege] = useMutation(SAVE_COLLEGE);
    const [executeSearch, { loading }] = useLazyQuery(SEARCH_COLLEGES, {
        onCompleted: data => {
            // Process the search results and add unique IDs
            const processedColleges = data.searchColleges.map(college => ({
                ...college,
                collegeId: generateHashId(college.name, college.city, college.state)
            }));
            setSearchedColleges(processedColleges);
        }
    });

    // Use the GET_ME query to fetch the user's saved colleges on component mount
    const { data: userData } = useQuery(GET_ME, {
        fetchPolicy: "network-only",
    });

    // Effect hook to update saved college IDs based on user data
    useEffect(() => {
        const userSavedCollegeIds = userData?.me?.savedColleges?.map(college => college.collegeId) || [];
        setSavedCollegeIds(userSavedCollegeIds);
        saveCollegeIds(userSavedCollegeIds); // Synchronize with localStorage
    }, [userData]);

    // Handle search form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!searchInput) return;
        executeSearch({ variables: { query: searchInput } });
    };

    // Handle saving a college
    const handleSaveCollege = async (collegeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            alert("You must be logged in to save colleges.");
            return false;
        }

        // Find the college to save from the search results
        const collegeToSave = searchedColleges.find(college => college.collegeId === collegeId);
        if (!collegeToSave) {
            console.error("College to save not found.");
            return;
        }

        // Prevent saving a college that's already saved
        if (savedCollegeIds.includes(collegeId)) {
            alert("This college has already been saved!");
            return;
        }

        // Execute the mutation to save the college
        try {
            const { name, city, state, size, collegeId: id } = collegeToSave;
            await saveCollege({
                variables: { newCollege: { name, city, state, size, collegeId: id }, token },
            });

            // Update the local state and localStorage with the new list of saved college IDs
            const newSavedCollegeIds = [...savedCollegeIds, id];
            setSavedCollegeIds(newSavedCollegeIds);
            saveCollegeIds(newSavedCollegeIds);
            alert("College saved successfully!");
        } catch (err) {
            console.error("Error saving college:", err);
            alert("An error occurred while saving the college.");
        }
    };

    // Render the search interface and display search results
    return (
        <>
            {/* Search input form */}
            <div className='ui inverted segment text-light bg-dark p-5'>
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

            {/* Display search results */}
            <Container>
                <h2 className='pt-5'>
                    {loading
                        ? 'Loading...'
                        : `${searchedColleges.length ? `Viewing ${searchedColleges.length} results:` : 'Search for a college to begin'}`
                    }
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
                                            onClick={() => handleSaveCollege(college.collegeId)}
                                        >
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
