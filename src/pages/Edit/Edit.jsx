import React, { useState, useEffect, useContext } from "react";
import "./Edit.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "../../components/Spiner/Spiner";
import { singleUsergetfunc } from "../../services/Apis";
import { BASE_URL } from "../../services/helper.";
import { editfunc } from "../../services/Apis";
import { updateData } from "../../components/context/ContextProvider";
const Edit = () => {
  const [showSpin, setShowSpin] = useState(true);

  const [inputData, setInputdata] = useState({
    first_name: "",
    last_name: "",
    email: "",
    // mobile: "",
    gender: "",
    location: "",
  });

  const [status, setstatus] = useState("True");
  const [image, setImage] = useState("");
  const [imgData, setImgData] = useState("");
  const [preview, setPreview] = useState("");
  const [domain, setDomain] = useState("");
  const { id } = useParams();
  // console.log(status);

  const navigate = useNavigate();

  const { update, setUpdate } = useContext(updateData);
  //set Input values

  const setInputValues = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputData, [name]: value });
  };
  //set status value

  const setStatusValues = (e) => {
    setstatus(e.value);
    // console.log(e);
  };
  const setDomainValues = (e) => {
    setDomain(e.value);
    // console.log(e);
  };

  //set profiles
  const setProfiles = (e) => {
    // setImage(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    // console.log(e.target.files[0]);
  };

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    if (response.status === 200) {
      // console.log(response);
      setInputdata(response.data);
      setstatus(response.data.status);
      setImgData(response.data.profile);
    } else {
      console.log("error");
    }
  };

  //submit user data
  const submitUserData = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email, mobile, gender, location } =
      inputData;
    if (first_name === "") {
      toast.error("Please enter first name");
    } else if (last_name === "") {
      toast.error("Please enter last name");
    } else if (email === "") {
      toast.error("Please enter email");
    } else if (!email.includes("@")) {
      toast.error("Please enter valid email");
      // } else if ( === "") {
      //   toast.error("Please enter mobile number");
      // } else if (mobile.length < 10) {
      //   toast.error("Mobile number should be atleast 10 digits long");
    } else if (gender === "") {
      toast.error("Please select your gender");
    } else if (status === "") {
      toast.error("Please select your status");
    } else if (domain === "") {
      toast.error("Please select your domain");
    }
    // else if (ImageData === "") {
    //   toast.error("Please select your profile image");
    // }
    else if (location === "") {
      toast.error("Please enter your location");
    } else {
      const data = new FormData();
      data.append("first_name", first_name);
      data.append("last_name", last_name);
      data.append("email", email);
      // data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("domain", domain);
      data.append("user_profile", image || imgData);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };
      const response = await editfunc(id, data, config);

      // console.log(response);

      if (response.status === 200) {
        setUpdate(response.data);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    setImgData("");
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  useEffect(() => {
    userProfileGet();
  }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await userProfileGet();
  //     // Additional logic if needed
  //   };

  //   fetchData();
  // }, []); // <-- Add an empty dependency array

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  //status options
  const options = [
    { value: "True", label: "True" },
    { value: "False", label: "False" },
  ];
  const allDomain = [
    { value: "Sales", label: "Sales" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "IT", label: "IT" },
    { value: "Management", label: "Management" },
    { value: "UI Designing", label: "UI Designing" },
    { value: "Business Development", label: "Business Development" },
  ];
  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Update Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img
                src={image ? preview : `${BASE_URL}/Uploads/${imgData}`}
                alt=""
              />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={inputData.first_name}
                    onChange={setInputValues}
                    placeholder="Enter First name"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={inputData.last_name}
                    onChange={setInputValues}
                    placeholder="Enter Last name"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputData.email}
                    onChange={setInputValues}
                    placeholder="Enter Email address"
                    required
                  />
                </Form.Group>
                {/* <Form.Group
              className="mb-3 col-lg-6"
              controlId="validationCustom03"
            >
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                name="mobile"
                value={inputData.mobile}
                onChange={setInputValues}
                placeholder="Enter mobile number"
                required
              />
            </Form.Group> */}
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputData.gender === "Male" ? true : false}
                    onChange={setInputValues}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputData.gender === "Female" ? true : false}
                    onChange={setInputValues}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>Availability</Form.Label>
                  <Select
                    options={options}
                    defaultValue={{ label: status, value: status }}
                    onChange={setStatusValues}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>Domain</Form.Label>
                  <Select
                    options={allDomain}
                    value={{ label: domain, value: domain }}
                    onChange={setDomainValues}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    // value={image}
                    placeholder="Upload a file"
                    onChange={setProfiles}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="validationCustom03"
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={inputData.location}
                    onChange={setInputValues}
                    placeholder="Enter your location"
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={submitUserData}
                  type="submit"
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>

          <ToastContainer position="top-right" />
          {/* Same as */}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Edit;
