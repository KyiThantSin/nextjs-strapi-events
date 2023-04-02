/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { RiMoonClearFill, RiMoonClearLine } from "react-icons/ri";
import { useContext } from "react";
import { ContextValue } from "pages/context";
import { Button } from "reactstrap";

const Header = () => {
  const contextValue = useContext(ContextValue);
  //console.log(contextValue.theme);
  //console.log(contextValue.user);
  return (
    <div css={styles.navbar(contextValue.theme)}>
      <span>
        <Link href="/" css={styles.linkStyle(contextValue.theme)}>
          Vamos
        </Link>
      </span>
      <span css={styles.linksContainer}>
        {/* dark mode controller */}
        {contextValue.theme ? (
          <RiMoonClearFill
            size={30}
            onClick={() => contextValue.setTheme(false)}
          />
        ) : (
          <RiMoonClearLine
            size={30}
            onClick={() => contextValue.setTheme(true)}
          />
        )}
        <Link
          href="/events"
          css={styles.linkStyle(contextValue.theme)}
          className="ms-3">
          Events
        </Link>
        {
          //only admin can access
          contextValue?.user && (
            <>
            <Link
              href="/events/addPost"
              css={styles.linkStyle(contextValue.theme)}
              className="ms-2">
              Add Events
            </Link>
             <Link
             href="/dashboard"
             css={styles.linkStyle(contextValue.theme)}
             className="ms-3">
             Dashboard
           </Link>
           </>
          )
        }
        {contextValue.user ? (
          <Button
            color="primary"
            outline
            className="ms-2"
            onClick={() => contextValue.logOut()}>
            Log Out
          </Button>
        ) : (
          <Link
            href="/login"
            css={styles.linkStyle(contextValue.theme)}
            className="ms-2">
            Login
          </Link>
        )}
      </span>
    </div>
  );
};
export default Header;

const styles = {
  navbar: (theme) => css`
    background-color: ${theme ? "#ffffff" : "#191919"};
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 0.5px solid grey;
    padding: 5px;

    @media (max-width: 767px) {
      flex-direction: column;
      height: auto;
    }
  `,
  linkStyle: (theme) => css`
    text-decoration: none;
    color: ${theme ? "#1a1a1a" : "#ffffff"};
    font-size: 1.2rem;
    font-weight: 600;

    &: hover {
      cursor: pointer;
      color: ${theme ? "#1a1a1a" : "#ffffff"};
    }
  `,
};
