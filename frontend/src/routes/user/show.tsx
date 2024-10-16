import { useSuspenseQuery } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { GET_USER } from "../../api/user";

export const Route = createFileRoute("/user/show")({
	component: () => {
		return (
			<>
				<Suspense fallback={<p>Loading...</p>}>
					<UserShow />
				</Suspense>
			</>
		);
	},
});

function UserShow() {
	const { data } = useSuspenseQuery(GET_USER);

	return (
		<div>
			<div>{`ユーザー名: ${data?.user?.username}`}</div>
			<div>{`メールアドレス: ${data?.user?.mailaddress}`}</div>
		</div>
	);
}
