/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button } from "reactstrap";
import Layout from "./components/Layout";

const login = () => {
  return (
    <Layout>
      <div css={styles.container}>
        <h3>Hello Again!</h3>
        <span>Welcome back, you've been missed.</span>
        <form>
          <div css={styles.box}>
            <label htmlFor="email">Email</label>
            <input type="email" required />
          </div>
          <div css={styles.box}>
            <label htmlFor="password">Password</label>
            <input type="password" required />
          </div>
          <Button className="mb-5 mt-4">Login</Button>
        </form>
      </div>
    </Layout>
  );
};
export default login;

const styles = {
  container: css`
    display: flex;
    margin-top: 6vh;
    margin-bottom: 5vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid #efe6ff;
    padding: 15px;
  `,
  box: css`
    display: flex;
    padding: 0.3vh;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
    flex-direction: column;
    justify-content: center;

    label {
      padding: 9px;
    }
    input {
      padding: 1.2vh;
      border-radius: 4px;
      border: 1px solid lightgrey;
      box-shadow: 0px;
    }
  `,
};
