import {
  Container,
  Card,
  Button,
  Grid,
  CardDescription,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Auth from "../utils/auth";
import { removeCollegeId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries/";
import { REMOVE_College } from "../utils/mutations";

const SavedColleges = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];
  const [removeCollege, { error }] = useMutation(REMOVE_College);

  // create function that accepts the college's mongo _id value as param and deletes the college from the database
  const handleRemoveCollege = async (collegeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(userData);

  return (
    <>
      <div className="text-light bg-dark p-5">
        {/* <Container>
          <h1>Viewing saved colleges!</h1>
        </Container> */}
      </div>
      <Container>
        <h2 className="pt-5">
          {userData?.savedColleges?.length
            ? `Viewing ${userData.savedColleges.length} saved ${
                userData.savedColleges.length === 1 ? "college" : "colleges"
              }`
            : "You have no saved colleges!"}
        </h2>
        <Grid>
          {userData.savedColleges.map((college) => {
            return (
              <Grid.Column key={college.collegeId} width={4}>
                <Card>
                  <Card.Content>
                    <Card.Header>{college.name}</Card.Header>
                    <CardDescription>{college.city}, {college.state}</CardDescription>
					<CardDescription>Enrolled: {college.size} Students</CardDescription>
                  </Card.Content>
                  <Card.Content extra>
                    <Button
                      basic
                      color="red"
                      onClick={() => handleRemoveCollege(college.collegeId)}
                    >
                      Delete this college!
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default SavedColleges;
