/** @jsxImportSource @emotion/react */
import { API_URL } from "@/configs/index";
import Card from "pages/components/Card";
import Layout from "../components/Layout";
import { Pagination } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import { Button, Col, Row } from "reactstrap";
import NoDataFound from "../../public/notFound";
import { ContextValue } from "pages/context";

export default function Events() {
  const {eventLists} = useContext(ContextValue)
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState(eventLists?.data);
  // console.log(userInput)
  console.log("event-data",eventLists)
  // console.log("this",events)
  useEffect(()=>{
    const fetchData = async () => {
      if (!eventLists?.data) {
        let res = await fetch(`${API_URL}/api/events?populate=url`);
        let data = await res.json();
        if (data) {
          setEvents(data.data);
        }
      }
    };  
    fetchData()
  },[eventLists])

  const handlerFunction = (e) => {
    let result = eventLists?.data?.filter((item) => {
      return item.attributes.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setEvents(result);
  };
  // console.log(events);
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
      <div className="m-md-5">
        <Row>
          <Col className="col-md-6 col-12">
            <h2 className="mt-4">Events</h2>
            <b>which are supported by Vamos</b>
          </Col>
          <Col className="col-md-6 col-12">
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search.."
                css={styles.box}
                onChange={handlerFunction}
              />
            </div>
          </Col>
        </Row>
        { ( eventLists || events ) &&
          events?.slice((page - 1) * 4, (page - 1) * 4 + 4).map((data) => {
            // console.log(data)
            return (
              <div key={data.id}>
                <Card data={data.attributes} id={data.id} />
              </div>
            );
          })}
        {events?.length === 0 && (
          <>
            <NoDataFound />
            <span css={styles.noData}> No data at the moment... </span>
          </>
        )}
        {eventLists && events.length > 0 && (
          <div css={styles.pagination}>
            <Button outline color="primary" css={styles.btn}>
              <Link href={"/"}> GO HOME </Link>
            </Button>
            <Pagination>{cards}</Pagination>
          </div>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  pagination: css`
    display: flex;
    justify-content: space-between;
  `,
  btn: css`
    height: 5vh;
    &:hover {
      background: transparent;
    }
    a {
      text-decoration: none;
      &:hover {
        background: transparent;
      }
    }
  `,
  box: css`
    padding: 8px;
    width: 80%;
    border-radius: 9px;
    border: 1px solid lightgrey;
  `,
  noData: css`
    color: grey;
    font-size: 1.4rem;
    margin-left: 3vh;
  `,
};
