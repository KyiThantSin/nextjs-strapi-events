/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "../configs";
const { useState, createContext, useEffect } = require("react");
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContextValue = createContext(null);

function Context({ children }) {
  const router = useRouter();
  const [theme, setTheme] = useState(true);
  const [eventLists, setEventLists] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // console.log(theme)

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //login user
  const Login = async ({ email: identifier, password }) => {
    // Strapi uses 'identifier' as an user/email
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "json/application",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();
    //console.log("data in authcontext", data);
    if (res.ok) {
      setUser(data.user);
      toast("🦄 Welcome back!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/");
    } else {
      setError(data.error);
    }
  };

  //logout user
  const logOut = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      toast("Successfully Logged out!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/");
    }
    //console.log("log out");
  };

  //check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
   // console.log("user", data);
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  //register user
  const Register = async ({ username, email, password }) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      toast("🦄 Successfully created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  return (
    <ContextValue.Provider
      value={{
        theme,
        setTheme,
        eventLists,
        setEventLists,
        Login,
        logOut,
        Register,
        user,
        error,
      }}>
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
      <div css={styles.container(theme)}>{children}</div>
    </ContextValue.Provider>
  );
}
export default Context;

const styles = {
  container: (value) => css`
    background: ${value ? "#FFFFFF" : "#191919"} !important;
    color: ${value ? "#191919" : "#FFFFFF"};
  `,
};
