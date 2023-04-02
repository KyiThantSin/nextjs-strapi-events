/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Layout from "./components/Layout";
import Cat from "../public/cat";
import { useContext } from "react";
import { ContextValue } from "./context";
import { Col, Row } from "reactstrap";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "../configs";

const dashboard = ({ events }) => {
  const { user } = useContext(ContextValue);
  console.log(events);
  return (
    <Layout>
      <Row css={styles.container}>
        <Col lg="6" sm="12">
          <h1 style={{ color: "#F99721" }}>Hello {user?.username} !</h1>
          <b style={{ fontWeight: "400" }}>
            Your event sharing platform is here, making it simple to spread the
            word about your upcoming events to those who matter most.
          </b>
        </Col>
        <Col lg="6" sm="12">
          <Cat />
        </Col>
      </Row>
    </Layout>
  );
};
export default dashboard;

export async function getServerSideProps({req}) {
  //console.log("running");
  const { token } = parseCookies(req);
  //console.log("dashboard", token);
  if (token) {
    const res = await fetch(`${API_URL}/api/events/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const events = await res.json();
    return {
      props: {
        events,
      },
    };
  } else {
    return {};
  }
}
const styles = {
  container: css`
    background: whitesmoke;
    padding: 20px;
    border: 3px solid whitesmoke;
    border-radius: 8px;
    margin-top: 25px;
  `,
};
