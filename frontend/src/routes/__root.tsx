import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import style from "./style.module.css";

export const Route = createRootRoute({
    component: () => (
        <>
			<header className={style.header}>
				<h2>SNS</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">ホーム</Link>
						</li>
						<li>
							<Link to="/user/new">新規ユーザー</Link>
						</li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    ),
});
