import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const link = createHttpLink({
	uri: "http://localhost:8080/query",
	credentials: "include",
});

const client = new ApolloClient({
	uri: "http://localhost:8080/query",
	cache: new InMemoryCache(),
	link: link,
});

const router = createRouter({ routeTree: routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>,
	);
}
