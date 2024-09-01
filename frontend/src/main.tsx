import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const client = new ApolloClient({
    uri: "http://localhost:8080/query",
    cache: new InMemoryCache(),
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
