/** @jsxImportSource @emotion/react */
import React from "react";
import ReactToPrint from "react-to-print";
import { Button } from "reactstrap";
import { IoIosCloudDownload } from "react-icons/io";
import { css } from "@emotion/react";

export const ComponentToPrint = React.forwardRef(( props, ref ) => {
  // console.log(ref)
  return (
    <>
      <ReactToPrint
        trigger={() => {
          return (
            <Button color="primary" outline css={styles.downloadBtn}>
              <IoIosCloudDownload size={22} color="#067FBA" /> Download
            </Button>
          );
        }}
        content={() => ref.current }
      />
    </>
  );
})

const styles = {
  downloadBtn: css`
    &:hover {
      background: #ffffff;
      color: #000000;
    }
  `,
};
