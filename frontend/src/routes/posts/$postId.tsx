import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Suspense, useState } from "react";
import { graphql } from "../../gql";

export const Route = createFileRoute("/posts/$postId")({
	component: () => {
		return (
			<>
				<Link to={"/"}>戻る</Link>
				<CommentForm />
				<Suspense fallback={<p>Loading...</p>}>
					<PostShow />
				</Suspense>
			</>
		);
	},
});

const GET_POST = graphql(`
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

const CREATE_COMMENT = graphql(`
	mutation createComment($postId: ID!, $content: String!) {
		createComment(postID: $postId, content: $content) {
			id
			content
		}
	}
`);

function PostShow() {
	const { postId } = Route.useParams();
	const { data } = useSuspenseQuery(GET_POST, { variables: { postId } });

	return (
		<div key={data?.post?.id}>
			<div
				style={{ marginTop: "8px" }}
			>{`by ${data?.post?.user?.username}`}</div>
			<div style={{ display: "flex", fontSize: "12px" }}>
				<p
					style={{ paddingRight: "4px" }}
				>{`作成日: ${data?.post?.createdAt ? format(data?.post?.createdAt, "yyyy/MM/dd HH:mm") : ""}`}</p>
				<p
					style={{ paddingLeft: "4px" }}
				>{`更新日: ${data?.post?.updatedAt ? format(data?.post?.updatedAt, "yyyy/MM/dd HH:mm") : ""}`}</p>
			</div>
			<div
				style={{
					width: "30%",
					border: "1px solid",
					whiteSpace: "pre-wrap",
				}}
			>
				{data?.post?.content}
			</div>
			<div style={{ display: "flex", fontSize: "14px" }}>
				<p
					style={{ paddingRight: "4px" }}
				>{`コメント数: ${data?.post?.comments.length}件`}</p>
				<p
					style={{ paddingLeft: "4px" }}
				>{`いいね: ${data?.post?.likes.length}件`}</p>
			</div>
			{data?.post?.comments.map((comment) => (
				<div key={comment.id}>
					<p>- - - - - -</p>
					<div style={{ display: "flex" }}>
						<div
							style={{ paddingRight: "4px" }}
						>{`by ${comment.user.username}`}</div>
						<div
							style={{ paddingLeft: "4px" }}
						>{`作成日: ${comment.createdAt ? format(comment.createdAt, "yyyy/MM/dd HH:mm") : ""}`}</div>
					</div>
					<div
						style={{
							width: "30%",
							border: "1px solid",
							whiteSpace: "pre-wrap",
						}}
					>
						{comment.content}
					</div>
				</div>
			))}
		</div>
	);
}

function CommentForm() {
	const { postId } = Route.useParams();
	const [content, setContent] = useState("");

	const [createCommentMutaion, { loading, error }] = useMutation(
		CREATE_COMMENT,
		{
			refetchQueries: [GET_POST],
		},
	);

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createCommentMutaion({ variables: { postId, content } });
					setContent("");
				}}
				style={{ margin: "32px 0px" }}
			>
				<div>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button type="submit">コメントする</button>
			</form>
			{error && <p >Error: {error.message}</p>}
		</>
	);
}
