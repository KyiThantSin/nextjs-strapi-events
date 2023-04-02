/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Row, Col, Modal } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { API_URL } from "@/configs/index";
import { UPDATE_EVENT } from "graphql/mutations/event";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";

const EditPost = ({ editModal, setEditModal , token}) => {
  //console.log(editModal);
  const router = useRouter();
  const [alert, setAlert] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState(editModal?.data?.name);
  const [venue, setVenue] = useState(editModal?.data?.venue);
  const [address, setAddress] = useState(editModal?.data?.address);
  const [performers, setPerformers] = useState(editModal?.data?.performers);
  const [desc, setDesc] = useState(editModal?.data?.description);
  const [time, setTime] = useState(editModal?.data?.time);
  const [imageUrl, setImageUrl] = useState(editModal?.data?.url)
  const check = Boolean(name && address && startDate && performers);

  //useMutation
  const [updateEvent, loading] = useMutation(UPDATE_EVENT, {
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: () => {},
  });

  useEffect(() => {
    if (!check) {
      setAlert("Please filled the required fields");
    } else {
      setAlert(null);
    }
  }, [check]);

  const imageHandler = async (value) => {
    const formData = new FormData();
    formData.append("files", value);
    // formData.append("ref",'events');
    // formData.append("refId",editModal?.id)
    // formData.append("field","image")
    //send to the strapi to get the url
    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      body: formData,
    });
    const result = await response.json();
    console.log("res",result)
    setImageUrl({ data: { attributes: { url: result[0]?.url } } })
  };

  const formatDate = (value) => {
    let format = value.toLocaleDateString().split("/");
    let dateFormat = `${format[2]}-${format[1]}-${format[0]}`;
    return dateFormat;
  };
  //console.log("imageUrl",imageUrl)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (check) {
      const updatedEvent = {
        name: name,
        slug: editModal?.data?.slug,
        venue: venue,
        address: address,
        performers: performers,
        date: editModal?.data?.date ? editModal?.data?.date : formatDate(startDate),
        time: time,
        description: desc,
        url: imageUrl ? imageUrl : editModal?.data?.url
      }
      let res = await fetch(`${API_URL}/api/events/${editModal.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: updatedEvent }),
      });
      if (res.ok) {
        //console.log("new", updatedEvent);
        toast("🦄 Updated Successfully!", {
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
        }{
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
      }}
    }
  };

  return (
    <Modal isOpen={editModal.isOpen} size="lg">
      <Row className="mt-4">
        <Col className="col-md-10">
          <h5
            style={{
              textAlign: "center",
              wordWrap: "break-word",
              color: "#2a2a2a",
            }}>
            Edit {editModal?.data?.name} Event
          </h5>
        </Col>
        <Col className="col-md-2">
          <IoMdClose
            size={25}
            onClick={() =>
              setEditModal({
                ...editModal,
                isOpen: false,
              })
            }
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
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
      <div css={styles.container}>
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
                defaultValue={editModal?.data?.name}
                //defaultValue={editModal?.data?.name}
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
                defaultValue={editModal?.data?.venue}
                //defaultValue={editModal?.data?.venue}
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
                defaultValue={editModal?.data?.address}
                //defaultValue={editModal?.data?.address}
                required
              />
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
                defaultValue={editModal?.data?.performers}
                //defaultValue={editModal?.data?.performers}
                required
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
                  defaultValue={editModal?.data?.date}
                  minDate={new Date()}
                  //defaultValue={editModal?.data?.date}
                  required
                />
              </div>
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                className="mt-2"
                id="description"
                name="description"
                onChange={(e) => setDesc(e.target.value)}
                defaultValue={editModal?.data?.description}
              />
              <br />
              <label htmlFor="description">Time</label>
              <br />
              <input
                className="mt-2"
                id="time"
                name="time"
                onChange={(e) => setTime(e.target.value)}
                defaultValue={editModal?.data?.time}
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
          {alert && (
            <b style={{ color: "red" }} className="mt-3">
              {alert}
            </b>
          )}
          <div className="mt-3" css={styles.btnContainer}>
            <Button
              onClick={() =>
                setEditModal({
                  ...editModal,
                  isOpen: false,
                })
              }
              outline
              className="mb-4">
              Cancle
            </Button>
            <Button
              color="primary"
              onClick={onSubmit}
              className="mb-4"
              disabled={!check}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EditPost;

const styles = {
  btnContainer: css`
    display: flex;
    justify-content: space-between;
  `,
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
    span {
      color: red;
    }
    label {
      margin-top: 2vh;
      font-size: 1.2rem;
      font-weight: 500;
      color: #2a2a2a;
    }
    input {
      border-radius: 7px;
      padding: 4px;
      border: 1px solid lightgrey;
      max-width: 60vh;
      height: 6vh;
    }
    input[type="file"] {
      max-width: 40vh;
    }
    textarea {
      border-radius: 7px;
      padding: 4px;
      border: 1px solid lightgrey;
      max-width: 60vh;
      height: 18vh;
      line-height: 1.2rem;
    }
  `,
};
