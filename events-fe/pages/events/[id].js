/** @jsxImportSource @emotion/react */
import { API_URL } from "@/configs/index";
import { css } from "@emotion/react";
import Layout from "pages/components/Layout";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete, AiFillCloseCircle } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { Button, Modal } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef} from "react";
import defaultImg from "../../public/vector.png";
import { useRouter } from "next/router";
import EditPost from "pages/components/editPost";
import {ComponentToPrint} from "pages/components/ComponentToPrint";

const Details = ({ event }) => {
  //console.log("item",event.data.data.id);
  const data = event.data.data.attributes;
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen:false,
    id:event.data.data.id,
    data:data
  });
  const [status, setStatus] = useState(false);
  const router = useRouter();
  const printInfo = useRef()

  const onDeleteHandler = async (id) => {
    // setModal(true);
    console.log("selected-id", id);
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
      });
      let data = await res.json();
      if (res.ok) {
        toast("🦄 Deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(()=>{
          router.push('/')
        },1000)
      } else {
        toast.warn("Oops...something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
  };

  const cancelHandler = () =>{
    setStatus(false)
    setModal(false)
  }

  return (
    <Layout>
      <>
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
      <div ref={printInfo} >  
        <div css={styles.headerContainer}>
          <div>
            <h3>{data.name}</h3>
            <ComponentToPrint ref={printInfo} />
          </div>
          <div css={styles.box}>
            <span>
              <BsFillCalendarEventFill size={22} color="#067FBA" /> {data.date}
            </span>
            <span className="mt-2">
              <BiTime size={30} color="#067FBA" /> {data.time}
            </span>
          </div>
        </div>
        <div css={styles.container} className="mt-5">
          {data.url?.data?.attributes?.url ? (
            <img
              src={data.url?.data?.attributes?.url}
              alt={data.name}
              width={600}
              height={400}
            />
          ) : (
            <Image src={defaultImg} alt={data.name} width={600} height={400} />
          )}
        </div>
        <div css={styles.detailContainer} className="mt-5">
          <span>
            {" "}
            <b>Venue : </b> {data?.venue}{" "}
          </span>
          <span>
            {" "}
            <b>Address : </b> {data?.address}{" "}
          </span>
          <span>
            {" "}
            <b>Host : </b> {data?.performers}{" "}
          </span>
          <p className="mt-2">
            <span css={styles.letterStyle}>{data?.description?.[0]}</span>
            {data?.description?.slice(1)}
          </p>
        </div>
      </div>
        <div css={styles.btnContainer}>
          <div css={styles.backBtn}>
            <Button outline color="primary" css={styles.btn}>
              <Link href={"/"}> GO HOME </Link>
            </Button>
          </div>
          <div className="m-2">
            <Button color="warning" onClick={()=> setEditModal({
              ...editModal,
              isOpen:true
            })}>
              <FiEdit3 size={20} /> Edit
            </Button>
            <Button
              color="danger"
              className="ms-2"
              onClick={() => setModal(true)}>
              <AiOutlineDelete size={20} className="mb-1" /> Delete
            </Button>
          </div>
        </div>
        {/* delete modal */}
        <Modal isOpen={modal} toggle={setModal} backdrop={modal}>
          <div css={styles.modal}>
            <AiFillCloseCircle
              size={25}
              onClick={() => setModal(false)}
              color="#067FBA"
              css={styles.icon}
            />
            <h5 style={{ textAlign: "center" }}>
              Are you sure you want to delete?{" "}
            </h5>
            <div css={styles.modalBtn}>
              <Button color="primary" outline onClick={cancelHandler}>
                Cancel
              </Button>
              <Button color="danger" onClick={()=> onDeleteHandler(event.data.data.id)}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
       { editModal && <EditPost editModal={editModal} setEditModal={setEditModal}/> } 
      </>
    </Layout>
  );
};

export default Details;

export async function getServerSideProps(context){
  const id = context.params.id;

  let res = await fetch(`${API_URL}/api/events/${id}?populate=url`);
  let data = await res.json();
  return {
    props : { event : {data}}
  }
}

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    margin-top: 2vh;
  `,
  box: css`
    margin-top:2vh;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
  `,
  headerContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3vh;
    line-height: 1rem;
    flex-wrap:wrap;
  `,
  detailContainer: css`
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
  `,
  letterStyle: css`
    font-size: 2rem;
  `,
  backBtn: css`
    display: flex;
    justify-content: flex-end;

    a {
      text-decoration: none;
      &:hover {
        background: transparent;
      }
    }
  `,
  btn: css`
    &:hover {
      background: transparent;
    }
  `,
  btnContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  modalBtn: css`
    display: flex;
    margin-top: 4vh;
    margin-bottom: 4vh;
    flex-direction: row;
    justify-content: space-evenly;
  `,
  modal: css`
    margin-top: 2vh;
    height: 90%;
  `,
  icon: css`
    margin-left: 90%;
    cursor: pointer;
  `,
};
