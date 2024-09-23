import { graphql } from "../gql";

export const CREATE_COMMENT = graphql(`
	mutation createComment($postId: ID!, $content: String!) {
		createComment(postID: $postId, content: $content) {
			id
			content
		}
	}
`);
