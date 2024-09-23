import { useQuery } from "@apollo/client";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
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
		<>
			<Link to="/posts/new">新規投稿</Link>
			<div style={{ marginTop: "16px" }}>
				{data?.posts.map((post) => (
					<div key={post.id}>
						<p>- - - - - -</p>
						<div style={{ display: "flex" }}>
							<Link to={`/posts/${post.id}`}>{`ID: ${post.id}`}</Link>
							<div
								style={{ paddingLeft: "16px" }}
							>{`by ${post.user.username}`}</div>
						</div>
						<div style={{ display: "flex", fontSize: "12px" }}>
							<p
								style={{ paddingRight: "4px" }}
							>{`作成日: ${format(post.createdAt, "yyyy/MM/dd HH:mm")}`}</p>
							<p
								style={{ paddingLeft: "4px" }}
							>{`更新日: ${format(post.updatedAt, "yyyy/MM/dd HH:mm")}`}</p>
						</div>
						<div
							style={{
								width: "30%",
								border: "1px solid",
								whiteSpace: "pre-wrap",
							}}
						>
							{post.content}
						</div>
						<div style={{ display: "flex", fontSize: "14px" }}>
							<p
								style={{ paddingRight: "4px" }}
							>{`コメント数: ${post.comments.length}件`}</p>
							<p
								style={{ paddingLeft: "4px" }}
							>{`いいね: ${post.likes.length}件`}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
