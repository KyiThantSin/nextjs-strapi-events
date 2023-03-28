/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NEXT_URL } from "../configs";
const { useState, createContext } = require("react");

export const ContextValue = createContext(null);

function Context({ children }) {
  const [theme, setTheme] = useState(true);
  const [eventLists, setEventLists] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // console.log(theme)

  //login
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
    console.log("data in authcontext", data);
    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.error);
      // setError(null);
    }
  };

  //log out
  const logOut = async () => {
    console.log("log out");
  };

  return (
    <ContextValue.Provider
      value={{
        theme,
        setTheme,
        eventLists,
        setEventLists,
        Login,
        user,
        error,
      }}>
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
