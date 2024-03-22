import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedColleges {
          name
          collegeId
          city
        }
      }
    }
  }
`;

export const SAVE_College = gql`
  mutation SaveCollege($newCollege: InputCollege!) {
    saveCollege(newCollege: $newCollege) {
      username
      email
      _id
      password
      colleges {
        name
        tuition
        size
        collegeId
        city
        state
        degrees
        admissions
      }
    }
  }
`;

export const REMOVE_college = gql`
  mutation RemoveCollege($collegeId: ID!) {
    removeCollege(collegeId: $collegeId) {
      _id
      username
      email
      savedColleges {
        collegeId
        name
        tuition
        size
        city
        degrees
        state
        admissions
      }
    }
  }
`;

