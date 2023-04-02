/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "@/configs/index";
import { CREATE_EVENT } from "graphql/mutations/event";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ContextValue } from "pages/context";
import { parseCookies } from "@/helpers/index";

const addPost = ({token}) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [alert, setAlert] = useState(true);
  const contextValue = useContext(ContextValue);
  const [name, setName] = useState();
  const [venue, setVenue] = useState();
  const [address, setAddress] = useState();
  const [performers, setPerformers] = useState();
  const [desc, setDesc] = useState();
  const [time, setTime] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [newEvent, setNewEvent] = useState();

  //useMutation
  const [createEvent, loading] = useMutation(CREATE_EVENT, {
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: () => {},
  });

  const check = Boolean(name && address && startDate && performers);

  useEffect(() => {
    if (name || address || performers) {
      if (name?.length > 0 && address?.length > 0 && performers?.length > 0) {
        setAlert(null);
      } else {
        setAlert("Please filled the required fields");
      }
    } else {
      setAlert(null);
    }
  }, [name, address, performers]);

  const formatDate = (value) => {
    let format = value.toLocaleDateString().split("/");
    let dateFormat = `${format[2]}-${
      format[0].length > 1 ? format[0] : "0" + format[0]
    }-${format[1]}`;
    return dateFormat;
  };

  // const imageHandler = async (value) => {
  //   const formData = new FormData();
  //   formData.append("files", value);
  //   //send to the strapi to get the url
  //   const response = await fetch(`${API_URL}/api/upload`, {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
  //     body: formData,
  //   });
  //   const result = await response.json();
  //   setImageUrl({ data: { attributes: { url: result[0].url } } });
  // };
  /*console.log("new", {
    name: name,
    venue: venue,
    address: address,
    performers: performers,
    date: formatDate(startDate),
    time: time,
    description: desc,
    url: { data: { attributes: { url: "" } } },
  })*/
  const onSubmit = async () => {
    setNewEvent({
      name: name,
      venue: venue,
      address: address,
      performers: performers,
      date: formatDate(startDate),
      description: desc,
      time: time,
      url: { data: { attributes: { url: "" } } },
    });
    if (newEvent) {
      let res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: newEvent }),
      });
      if (res.ok) {
        console.log("new", newEvent);
        toast("🦄 Added Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        if(res.status === 403 || res.status === 401){
          toast.error("No token included!");
          return
        }else{
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
    }}
  };

  return (
    <Layout>
      <h3 style={{ textAlign: "center" }} className="mt-5">
        Create A New Event
      </h3>
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
      {/* Same as */}
      <ToastContainer />
      <div css={styles.container(contextValue.theme)}>
        <form>
          <Row>
            <Col className="col-md-6 col-12">
              <label htmlFor="name">
                Name <span>*</span>{" "}
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <label htmlFor="venue">Venue</label>
              <br />
              <input
                type="text"
                id="venue"
                name="venue"
                className="mt-2"
                onChange={(e) => setVenue(e.target.value)}
              />
              <br />
              <label htmlFor="address">
                Address <span>*</span>{" "}
              </label>
              <br />
              <input
                type="text"
                id="address"
                name="address"
                className="mt-2"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <br />
              <label htmlFor="address">Time </label>
              <input
                type="text"
                id="time"
                name="time"
                className="mt-2"
                onChange={(e) => setTime(e.target.value)}
              />
            </Col>
            <Col className="col-md-6 col-12">
              <div>
                <label htmlFor="date">
                  Date <span>*</span>{" "}
                </label>
                <br />
                <DatePicker
                  id="date"
                  name="date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MMM / dd / yyy"
                  className="mt-2"
                  minDate={new Date()}
                  required
                />
              </div>
              <br />
              <label htmlFor="performers">
                Hosts <span>*</span>{" "}
              </label>
              <br />
              <input
                type="text"
                id="performers"
                name="performers"
                className="mt-2"
                onChange={(e) => setPerformers(e.target.value)}
                required
              />
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                className="mt-2 mb-5"
                id="description"
                name="description"
                onChange={(e) => setDesc(e.target.value)}
              />
              {/* <label htmlFor="url">Image</label>
              <br />
              <input
                type="file"
                className="mt-2"
                id="url"
                name="url"
                accept="image/*"
                onChange={(e) => imageHandler(e.target.files[0])}
              /> */}
            </Col>
          </Row>
          <br />
          {alert && (
            <b style={{ color: "red" }} className="mt-3">
              {alert}
            </b>
          )}
          <div className="mt-3 mb-5">
            <Button color="primary" onClick={onSubmit} disabled={!check}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default addPost;

//to get the token
export async function getServerSideProps({req}){
  //console.log('running')
  const {token} = parseCookies(req)
  //console.log("add-post",token)
  return {
    props: {
      token
    }
  }
}

const styles = {
  container: (theme) => css`
    background: ${theme ? "#FFFFFF" : "#191919"} !important;
    color: ${theme ? "#191919" : "#FFFFFF"};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 7vh;
    margin-bottom: 16.5vh;
    span {
      color: red;
    }
    label {
      margin-top: 2vh;
      font-size: 1.2rem;
      font-weight: 500;
      color: ${theme ? "#2a2a2a" : "#FFFFFF"};
    }
    input {
      border-radius: 7px;
      padding: 4px;
      border: 1px solid lightgrey;
      width: 90%;
      height: 12%;
    }
    textarea {
      border-radius: 7px;
      padding: 4px;
      border: 1px solid lightgrey;
      width: 90%;
      height: 18vh;
      line-height: 1.2rem;
    }
  `,
};
