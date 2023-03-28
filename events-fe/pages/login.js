/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";
import { Button } from "reactstrap";
import Layout from "./components/Layout";
import { ContextValue } from "./context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
  const { Login, error } = useContext(ContextValue);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      toast.warn(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log("this", email, password);
      Login({ email, password });
    }
  };
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div css={styles.container}>
        <h3>Hello Again!</h3>
        <span>Welcome back, you've been missed.</span>
        <form>
          <div css={styles.box}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div css={styles.box}>
            <label htmlFor="password">Password</label>
            <div class="password-input-container">
              <input
                type={open ? "text" : "password"}
                required
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span class="password-icon">
                {open ? (
                  <IoEyeOutline size={20} onClick={() => setOpen(false)} />
                ) : (
                  <RiEyeCloseLine size={20} onClick={() => setOpen(true)} />
                )}
              </span>
            </div>
          </div>
          <Button className="mb-5 mt-4" color="primary" onClick={handleSubmit}>
            Login
          </Button>
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
    border-radius: 15px;
    padding: 15px;

    span {
      color: grey;
      font-weight: 400;
    }
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
      font-weight: 800;
    }
    input {
      padding: 1.2vh;
      border-radius: 4px;
      border: 1px solid lightgrey;
      box-shadow: 0px;
    }
    .password-input-container {
      position: relative;
    }
    .password-icon {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background-image: url("path/to/icon.png");
      background-repeat: no-repeat;
      background-size: contain;
    }
  `,
};
