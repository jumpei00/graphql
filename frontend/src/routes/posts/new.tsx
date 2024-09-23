import { useMutation } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { graphql } from "../../gql";

export const Route = createFileRoute("/posts/new")({
	component: PostNew,
});

function PostNew() {
	const [content, setContent] = useState("");

	const createPost = graphql(`
        mutation createPost($content: String!) {
            createPost(content: $content) {
                id
                content
            }
        }
    `);

	const [createPostMutaion, { loading, error }] = useMutation(createPost);

	if (loading) return <p>Submitting...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createPostMutaion({ variables: { content: content } });
			}}
		>
			<div>内容</div>
			<div>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
