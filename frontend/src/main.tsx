import { createRoot } from "react-dom/client";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
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

createRoot(document.getElementById("root")!).render(
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>
);
