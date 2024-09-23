import { graphql } from "../gql";

export const GET_POSTS = graphql(`
	query getPosts {
		posts {
			id
			content
			createdAt
			updatedAt
			user {
				id
				username
			}
			comments {
				id
			}
			likes {
				id
			}
		}
	}
`);

export const GET_POST = graphql(`
	query getPost($postId: ID!) {
		post(id: $postId) {
			id
			content
			createdAt
			updatedAt
			user {
				id
				username
			}
			comments {
				id
				content
				createdAt
				updatedAt
				user {
					id
					username
				}
			}
			likes {
				id
			}
		}
	}
`);

export const CREATE_POST = graphql(`
	mutation createPost($content: String!) {
		createPost(content: $content) {
			id
			content
		}
	}
`);
