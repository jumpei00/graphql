import { useQuery } from "@apollo/client";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { createContext } from "react";
import style from "./style.module.css";
import { GET_USER } from "../api/user";

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
	const { loading, error, data } = useQuery(GET_USER);

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
