import { useMutation } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { graphql } from "../../gql";

export const Route = createFileRoute("/user/new")({
	component: UserNew,
});

function UserNew() {
	const [formData, setFormData] = useState({
		mailaddress: "",
		username: "",
		password: "",
	});

	const createUser = graphql(`
        mutation createUser($userInput: UserInput!) {
            createUser(userInput: $userInput) {
                id
                mailaddress
                username
            }
        }
    `);

	const [createUserMutaion, { loading, error }] = useMutation(createUser);

	if (loading) return <p>Submitting...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createUserMutaion({ variables: { userInput: formData } });
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
