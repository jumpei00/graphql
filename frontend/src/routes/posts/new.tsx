import { useMutation } from "@apollo/client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CREATE_POST, GET_POSTS } from "../../api/post";

export const Route = createFileRoute("/posts/new")({
	component: PostNew,
});

function PostNew() {
	const navigate = useNavigate({ from: "/posts/new" });
	const [content, setContent] = useState("");
	const [createPostMutaion, { loading, error }] = useMutation(CREATE_POST, {
		refetchQueries: [GET_POSTS],
	});

	if (loading) return <p>Submitting...</p>;

	return (
		<>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const res = await createPostMutaion({
						variables: { content: content },
					});
					if (!res.errors) {
						navigate({ to: "/", replace: true });
					}
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
			{error && <p>Error: {error.message}</p>}
		</>
	);
}
