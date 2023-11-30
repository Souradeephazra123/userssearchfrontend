import React, { useEffect, useState } from "react";
import "./Profile.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { FaMobile } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { FaLocationPin } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router-dom";
import { singleUsergetfunc } from "../../services/Apis";
import { BASE_URL } from "../../services/helper.";
import Moment from "moment";
import Spiner from "../../components/Spiner/Spiner";
const Profile = () => {
  const [userprofile, setUserprofile] = useState({});
  const [showSpin, setShowSpin] = useState(true);
  const { id } = useParams();
  // console.log(id);
  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);
    // console.log(response);
    if (response.status === 200) {
      setUserprofile(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const userProfileGet = async () => {
      const response = await singleUsergetfunc(id);
      if (response.status === 200) {
        setUserprofile(response.data);
      } else {
        console.log("");
      }
    };

    

    userProfileGet();
  }, [id, setUserprofile]);
  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
    
    <div className="container">
      <Card className="card-profile shadow col-lg-6 mx-auto mt-5 p-4">
        <Row>
          <div className="col">
            <div className="card-profile-stats d-flex justify-content-center">
              {/* <img src={`${BASE_URL}/Uploads/${userprofile.profile}`} alt="" /> */}
              {userprofile.profile && userprofile.profile.startsWith("http") ? (
                <img src={userprofile.profile} alt="Web Profile" />
              ) : (
                <img
                  src={`${BASE_URL}/Uploads/${userprofile.profile}`}
                  alt="User Profile"
                />
              )}
            </div>
          </div>
        </Row>

        <div className="card-email text-center">
          <h3>{userprofile.first_name + userprofile.last_name}</h3>
          <h4>
            <MdEmail className="email" />
            &nbsp; :-
            <span>{userprofile.email}</span>
          </h4>
          {/* <h5>
            <FaMobile />
            &nbsp; :-
            <span>{userprofile.mobile}</span>
          </h5> */}
          <h4>
            <FaPerson />
            &nbsp; :-
            <span>{userprofile.gender}</span>
          </h4>
          <h4>
            <FaLocationPin className="location" />
            &nbsp; :-
            <span>{userprofile.location}</span>{" "}
          </h4>
          <h4>
            Status&nbsp; :-
            <span>{userprofile.status}</span>{" "}
          </h4>
          <h5>
            <FaCalendarAlt className="calender" />
            &nbsp; Date Created&nbsp; :-
            <span>
              {Moment(userprofile.dateCreated).format("DD-MM-YYYY")}
            </span>{" "}
          </h5>
          <h5>
            <FaCalendarAlt className="calender" />
            &nbsp; Date Updated &nbsp; :-
            <span></span>{" "}
          </h5>
        </div>
      </Card>
    </div>)}
    </>
  );
};

export default Profile;
