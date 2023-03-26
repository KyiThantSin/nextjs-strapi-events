/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Row, Col } from "reactstrap"
import Moon from "../../public/moon"

const Board = () => {
  return (
    <Row className="m-2" css={styles.wrapper}>
      <Col css={styles.title}>
          Yours <span>VAMOS</span>
      </Col>
      <Col className="col-md-3">
        <Moon />
      </Col>
    </Row>
  );
};
export default Board;

const styles ={
  wrapper:css`
    background:#3f3d56;
    min-height:33vh;
  `,
  title:css`
    color:#FFFFFF;
    font-size:2rem;
    text-align:center;
    margin-top:5vh;

    span{
      font-size:4rem;
      font-weight:800;
    }
  `
}