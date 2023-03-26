/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div css={styles.container}>
      <Spinner color="primary" />
    </div>
  );
};
export default Loader;

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
