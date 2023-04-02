/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Layout from "./components/Layout";
import Cat from "../public/cat";
import { useContext, useState } from "react";
import { ContextValue } from "./context";
import { Col, Row } from "reactstrap";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "../configs";
import { Pagination } from "react-bootstrap";
import Card from "pages/components/Card";
import NoDataFound from "../public/notFound";

const dashboard = ({ events }) => {
  const { user } = useContext(ContextValue);
  const [page, setPage] = useState(1);

  //console.log(events);

  //page handler
  const pageHandler = (no) => {
    setPage(no);
  };

  let cards = [];
  for (let i = 1; i <= events?.length / 3; i++) {
    cards.push(
      <Pagination.Item
        active={i === page}
        key={i}
        onClick={() => pageHandler(i)}>
        {i}
      </Pagination.Item>
    );
  }

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
      {events &&
        events.length > 0 &&
        events?.slice((page - 1) * 4, (page - 1) * 4 + 4).map((data) => {
          //console.log(data)
          return (
            <div key={data.id}>
              <Card data={data} id={data.id} />
            </div>
          );
        })}
      {events?.length === 0 && (
        <>
          <NoDataFound />
          <span css={styles.noData}>Your dashboard is lonely, Let's change that !.</span>
        </>
      )}
      {events && events.length > 0 && <Pagination>{cards}</Pagination>}
    </Layout>
  );
};
export default dashboard;

export async function getServerSideProps({ req }) {
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
  noData: css`
    color: grey;
    font-size: 1.4rem;
    margin-left: 3vh;
  `,
};
