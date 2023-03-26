import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { ApolloProvider } from "@apollo/client";
import client from "graphql/apollo-client";
import Context from "./context";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Context>
        <Component {...pageProps} />
      </Context>
    </ApolloProvider>
  );
}
