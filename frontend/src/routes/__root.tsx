import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import Posts from ".";

export const Route = createRootRoute({
    component: () => (
        <div>
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">
                            ホーム
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
            <Posts />
        </div>
    ),
});
