/** @jsxImportSource @emotion/react */
import Layout from "./components/Layout";
import { API_URL } from "@/configs/index";
import Card from "./components/Card";
import { Badge } from "reactstrap";
import Coffee from "../public/coffee";
import { css } from "@emotion/react";
import { SiGmail } from "react-icons/si";
import Board from "./components/Board";
import { useContext, useEffect } from "react";
import { ContextValue } from "./context";

export default function Home({ events }) {
  const { eventLists, setEventLists } = useContext(ContextValue);
  useEffect(() => {
    setEventLists(events);
  }, []);
  return (
    <Layout>
      <div className="m-md-5">
        <Board />
        <h4 className="mt-4 mb-2">
          Upcoming Events <Badge color="primary">3</Badge>
        </h4>
        {eventLists?.data?.slice(0, 3)?.map((event) => {
          //  console.log(event)
          return (
            <div key={event.id}>
              <Card data={event.attributes} id={event.id} />
            </div>
          );
        })}
        <div className="mt-5" css={styles.container}>
          <h2>What is Vamos ? </h2>
          <span
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-1">
            {" "}
            <Coffee />{" "}
          </span>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
          </p>
        </div>
        <SiGmail size={30} color="#067FBA" />
        <span css={styles.email}>
          <a href="Vamos@gamil.com"> Vamos@gmail.com </a>
        </span>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  let res = await fetch(`${API_URL}/api/events?populate=url,user`);
  let data = await res.json();

  return {
    props: { events: data },
  };
}

const styles = {
  container: css`
    display: flex;
    text-align: center;
    flex-direction: column;

    p {
      margin: 3vh;
      font-size: 1.1rem;
      text-align: center;
      font-weight: 600;
    }
  `,
  email: css`
    font-weight: 600;
    cursor: pointer;

    a {
      text-decoration: none;
    }
  `,
};
