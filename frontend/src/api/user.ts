import { graphql } from "../gql";

export const CREATE_USER = graphql(`
	mutation createUser($userInput: UserInput!) {
		createUser(userInput: $userInput) {
			id
			mailaddress
			username
		}
	}
`);
