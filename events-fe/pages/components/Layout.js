/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Footer from "./Footer";
import Head from "next/head";
import Header from "./header";
import { useContext } from "react";
import { ContextValue } from "pages/context";
export default function Layout({ title, description, children }) {
  const contextValue = useContext(ContextValue)
  // console.log(contextValue)
  return (
    <>
      <div css={styles.container}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Vamos | Topic Board",
  description: "Find popular events near you",
};

const styles = {
  container: css`
    margin: 0px 40px;
  `,
};
