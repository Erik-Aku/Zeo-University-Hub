import { gql } from "@apollo/client";
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      collegeCount
      savedColleges {
        collegeId
        name
        size
        degrees
        city
        state
      }
    }
  }
`;
