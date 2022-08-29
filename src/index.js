import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from "@apollo/client"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000",
    }),
})

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
