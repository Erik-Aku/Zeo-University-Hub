import { gql } from '@apollo/client';

export const GET_ME = gql`
	query Me {
		me {
			_id
			username
			email
			savedColleges {
				collegeId
				name
				city
				state
				size
			}
		}
	}
`;

export const SEARCH_COLLEGES = gql`
	query searchColleges($query: String!) {
		searchColleges(query: $query) {
			name
			city
			state
			size
		}
	}
`;
