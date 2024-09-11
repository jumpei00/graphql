import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import style from "./style.module.css";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";

export const Route = createRootRoute({
    component: Root,
});

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
            <Outlet />
        </>
    );
}
