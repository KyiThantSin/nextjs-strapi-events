/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FiAlertTriangle } from "react-icons/fi";

import { useRouter } from "next/router";

const NotFound = () => {
  const route = useRouter();
  return (
    <div css={styles.container}>
      <h2>
        {" "}
        404 Not Found <FiAlertTriangle />
      </h2>
      <h5 onClick={() => route.push("/")} css={styles.linkStyle}>
        Go Home
      </h5>
    </div>
  );
};
export default NotFound;

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    margin: 300px;
    justify-content: center;
    align-contents: center;
    font-weight: 600;
  `,
  linkStyle: css`
    cursor: pointer;
  `,
};
