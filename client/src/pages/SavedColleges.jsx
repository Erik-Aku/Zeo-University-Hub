import { Container, Card, Button, Grid, CardDescription } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Auth from "../utils/auth";
import { removeCollegeId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries/";
import { REMOVE_COLLEGE } from "../utils/mutations";

const SavedColleges = () => {
    const { loading, data, error } = useQuery(GET_ME);
    const userData = data?.me || {};
    const [removeCollege] = useMutation(REMOVE_COLLEGE);

    // create function that accepts the college's mongo _id value as param and deletes the college from the database
    const handleRemoveCollege = async (collegeId) => {
        //   const token = Auth.loggedIn() ? Auth.getToken() : null;

        //   if (!token) {
        //     return false;
        //   }
        if (!Auth.loggedIn()) {
            console.log("You must be logged in to remove colleges.");
            return false;
        }

        try {
            await removeCollege({
                variables: { collegeId },
            });
            removeCollegeId(collegeId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    console.log(userData);

    return (
        <>
            <div className="text-light bg-dark p-5"></div>
            <Container>
                <h2 className="pt-5">
                    {userData?.savedColleges?.length
                        ? `Viewing ${userData.savedColleges.length} saved ${userData.savedColleges.length === 1 ? "college" : "colleges"
                        }`
                        : "You have no saved colleges!"}
                </h2>
                <Grid>
                    {userData?.savedColleges?.length > 0 ? (
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
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default SavedColleges;