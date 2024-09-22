import { useQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { graphql } from "../gql";

export const Route = createFileRoute("/")({
	component: Posts,
});

function Posts() {
	const getPosts = graphql(`
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

	const { loading, error, data } = useQuery(getPosts);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	return (
		<div>
			{data?.posts.map((post) => (
				<div key={post.id}>
					<p>{post.content}</p>
					<p>{post.createdAt}</p>
					<p>{post.updatedAt}</p>
					<p>{post.user.username}</p>
					<p>{post.comments.length}</p>
					<p>{post.likes.length}</p>
				</div>
			))}
		</div>
	);
}
