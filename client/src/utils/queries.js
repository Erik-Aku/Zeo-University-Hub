import { gql } from "@apollo/client";
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedColleges {
        collegeId
        name
        tuition
        size
        degrees
        city
        state
        admissions
      }
    }
  }
`;
