/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { Button, Col, Row } from "reactstrap";
import defaultImg from '../../public/vector.png'
import Image from "next/image";

export const Card = ({ data, id }) => {
  // console.log(data)
  return (
    <Row css={styles.container}>
      <Col className="col-lg-3 col-12 col-md-12">
      { data?.url.data?.attributes.url? 
      ( <img
          src={data?.url.data?.attributes.url}
          alt={ data?.slug ? data.slug : data?.date}
          width={300}
          height={200}
        /> ) : (
          <Image 
          src={defaultImg}
          alt={data.slug}
          width={300}
          height={200}
          /> )
      }
      </Col>
      <Col className="col-lg-7 col-12 col-md-12 mt-3">
        <div css={styles.header}>
          <h4>{data.name}</h4>
          <Button color="warning" css={styles.btn}>
            <Link href={`/events/${id}`}>Details</Link>
          </Button>
        </div>
        <h5 style={{ color: "#0E5D84" }}>{data?.venue}</h5>
        <div css={styles.box}>
          <span>
            <b> Date : </b> {data?.date}{" "}
          </span>
          <span>
            <b> Time : </b> {data.time}{" "}
          </span>
        </div>
        <p className="mt-2">
          <b>Description : </b> {data?.description?.slice(0, 90)}
        </p>
      </Col>
    </Row>
  );
};
export default Card;
const styles = {
  container: css`
    background: #f9f9f9;
    color: #2e2f30;
    padding: 9px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    width: 100%;
    border-radius: 9px;
    border: 1px solid transparent;
    box-shadow: 2px 0px 2px 0px lightgrey;

    &: hover {
      box-shadow: 5px 5px 5px 5px lightgrey;
      cursor: pointer;
    }
  `,
  header: css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  `,
  box: css`
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
  `,
  btn: css`
    margin-bottom: 2vh;
    a {
      text-decoration: none;
      color: #ffffff;
    }
  `,
};
