import { useQuery } from "@apollo/client";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { createContext } from "react";
import { graphql } from "../gql";
import style from "./style.module.css";

export const Route = createRootRoute({
	component: Root,
});

interface User {
	id?: string;
	username?: string;
	mailaddress?: string;
}

export const UserContext = createContext<User | null>(null);

function Root() {
	const getUser = graphql(`
        query getUser {
            user {
                id
                username
                mailaddress
            }
        }
    `);

	const { loading, error, data } = useQuery(getUser);

	return (
		<>
			<header className={style.header}>
				<h2>SNS</h2>
				<nav>
					<ul>
						<li>
							<Link to="/">ホーム</Link>
						</li>
						<li>
							{loading || error ? (
								<Link to="/user/new">新規ユーザー</Link>
							) : (
								<Link to="/user/show">{`ユーザー情報(${data?.user?.username})`}</Link>
							)}
						</li>
					</ul>
				</nav>
			</header>
			<UserContext.Provider
				value={
					data
						? {
								id: data.user?.id,
								username: data.user?.username,
								mailaddress: data.user?.mailaddress,
							}
						: null
				}
			>
				<Outlet />
			</UserContext.Provider>
		</>
	);
}
