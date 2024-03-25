import { gql } from '@apollo/client';

export const GET_ME = gql`
	query {
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
				__typename
			}
			__typename
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
