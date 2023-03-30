/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Footer = () => {
  return (
    <div css={styles.container}>
        Copyright 2023 |&nbsp; <b> Vamos </b>
    </div>
  );
};
export default Footer;

const styles = {
  container: css`
    display:flex;
    justify-content:center;
    text-align:center;
    font-size: 1rem;
    padding:20px;
    margin-bottom:1vh;
  `
};
