import { graphql } from "../gql";

export const GET_USER = graphql(`
	query getUser {
		user {
			id
			username
			mailaddress
			createdAt
			updatedAt
		}
	}
`);

export const CREATE_USER = graphql(`
	mutation createUser($userInput: UserInput!) {
		createUser(userInput: $userInput) {
			id
			mailaddress
			username
		}
	}
`);
