// Import necessary components and styles from semantic-ui-react and other utility functions
import { Container, Card, Button, Grid, CardDescription } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Auth from "../utils/auth";
import { removeCollegeId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries/";
import { REMOVE_COLLEGE } from "../utils/mutations";

// Define the SavedColleges component
const SavedColleges = () => {
    // Execute the GET_ME query to fetch the current user's saved colleges
    const { loading, data, error } = useQuery(GET_ME);
    // Extract user data or set to an empty object if undefined
    const userData = data?.me || {};
    // Initialize the REMOVE_COLLEGE mutation
    const [removeCollege] = useMutation(REMOVE_COLLEGE);

    // Function to handle the removal of a college from the saved list
    const handleRemoveCollege = async (collegeId) => {
        // Check if the user is logged in
        if (!Auth.loggedIn()) {
            console.log("You must be logged in to remove colleges.");
            return false;
        }

        // Execute the mutation to remove the college and update the local storage
        try {
            await removeCollege({
                variables: { collegeId },
            });
            removeCollegeId(collegeId);
        } catch (err) {
            console.error(err);
        }
    };

    // Display loading message if data is being fetched
    if (loading) return <div>Loading...</div>;
    // Display error message if there is an error fetching data
    if (error) return <div>An error occurred: {error.message}</div>;

    // Render the UI for saved colleges
    return (
        <>
            <div className="text-light bg-dark p-5"></div>
            <Container>
                <h2 className="pt-5">
                    {
                        // Display the number of saved colleges or a message if there are none
                        userData?.savedColleges?.length
                            ? `Viewing ${userData.savedColleges.length} saved ${userData.savedColleges.length === 1 ? "college" : "colleges"}`
                            : "You have no saved colleges!"
                    }
                </h2>
                <Grid>
                    {
                        // Iterate over saved colleges and display them in a grid
                        userData?.savedColleges?.length > 0 ? (
                            userData.savedColleges.map((college) => (
                                <Grid.Column key={college.collegeId} width={4}>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>{college.name}</Card.Header>
                                            <CardDescription>{college.city}, {college.state}</CardDescription>
                                            <CardDescription>Enrolled: {college.size} Students</CardDescription>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button basic color="red" onClick={() => handleRemoveCollege(college.collegeId)}>
                                                Delete this college!
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            ))
                        ) : (
                            <p>No colleges saved.</p>
                        )
                    }
                </Grid>
            </Container>
        </>
    );
};

export default SavedColleges;
