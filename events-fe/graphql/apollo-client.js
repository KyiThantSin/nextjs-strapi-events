import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "../configs";

const client = new ApolloClient({
    uri: `${API_URL}/api/events`,
    cache: new InMemoryCache(),
});

export default client;