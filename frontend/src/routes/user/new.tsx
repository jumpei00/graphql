import { useMutation } from "@apollo/client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GET_POSTS } from "../../api/post";
import { CREATE_USER } from "../../api/user";

export const Route = createFileRoute("/user/new")({
	component: UserNew,
});

function UserNew() {
	const navigate = useNavigate({ from: "/user/new" });
	const [formData, setFormData] = useState({
		mailaddress: "",
		username: "",
		password: "",
	});

	const [createUserMutaion, { loading, error }] = useMutation(CREATE_USER, {
		refetchQueries: [GET_POSTS],
	});

	if (loading) return <p>Submitting...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				const res = await createUserMutaion({
					variables: { userInput: formData },
				});
				if (!res.errors) {
					navigate({ to: "/", replace: true });
				}
			}}
		>
			<div>
				<div>mail address</div>
				<input
					name="mail address"
					value={formData.mailaddress}
					onChange={(e) =>
						setFormData({
							...formData,
							mailaddress: e.target.value,
						})
					}
				/>
			</div>
			<div>
				<div>user name</div>
				<input
					name="user name"
					value={formData.username}
					onChange={(e) =>
						setFormData({
							...formData,
							username: e.target.value,
						})
					}
				/>
			</div>
			<div>
				<div>password</div>
				<input
					name="password"
					value={formData.password}
					onChange={(e) =>
						setFormData({
							...formData,
							password: e.target.value,
						})
					}
				/>
			</div>
			<button type="submit">Send</button>
		</form>
	);
}
