/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const { useState, createContext} = require("react");

export const ContextValue = createContext(null);

function Context({ children }) {
  const [theme, setTheme] = useState(true);
  const [eventLists, setEventLists] = useState(null)
  // console.log(theme)
  return (
    <ContextValue.Provider value={{ theme, setTheme, eventLists, setEventLists }}>
      <div css={styles.container(theme)}>
        {children}
      </div>
    </ContextValue.Provider>
  );
}
export default Context;

const styles = {
  container: (value) => css`
    background: ${value ? '#FFFFFF' : '#191919' } !important;
    color: ${value ? '#191919': '#FFFFFF' };
  `
}