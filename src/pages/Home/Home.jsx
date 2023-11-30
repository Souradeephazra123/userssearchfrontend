import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Table from "../../components/Tables/Tables";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spiner from "../../components/Spiner/Spiner";
import {
  addData,
  dltdata,
  updateData,
} from "../../components/context/ContextProvider";
import {
  userGetfunc,
  deletefunc,
  createteamfunc,
  getteamfunc,
} from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [showSpin, setShowSpin] = useState(true);
  // I'm using the || {} (or operator with an empty object) to ensure that if useContext(addData) returns undefined, it will be replaced with an empty object {}. This way, you won't get a "Cannot read properties of undefined" error when trying to access properties of useradd.
  const { useradd, setUseradd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDeletedata } = useContext(dltdata);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setstatus] = useState("All");
  const [domain, setDomain] = useState("All");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const addUser = () => {
    navigate("/register");
  };

  const showteams = () => {
    navigate("/teams");
  };
  //creating team
  const createTeam = async () => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }

    try {
      // Make an API request to create a team with selected user IDs
      const response = await createteamfunc({ members: selectedUsers });

      // Reset selected users
      setSelectedUsers([]);

      // Assuming the server responds with the created team data
      const createdTeam = response.data;

      // Perform any additional actions with the created team data
      console.log("Team created:", createdTeam);
      toast.success("Team created Successfully");

      // setUseradd("Team created successfully!"); // Display success message
      setUpdate(""); // Reset update message
    } catch (error) {
      console.error("Error creating team", error);
      toast.error("Error creating team");
      // Reset selected users
      setSelectedUsers([]);
      // setUseradd(""); // Reset useradd message
      // setUpdate("Error creating team"); // Display error message
    }
  };

  // const viewTeam = async () => {
  //   try {
  //     // Make an API request to get teams
  //     const response = await getteamfunc();
  //     console.log(response.data); // Log teams data

  //     // Navigate to the view teams page, passing the teams data as state (optional)
  //     navigate("/team/details", { state: { teams: response.data } });
  //   } catch (error) {
  //     console.error("Error fetching teams", error);
  //     setUseradd(""); // Reset useradd message
  //     setUpdate("Error fetching teams"); // Display error message
  //   }
  // };

  const viewTeam = () => {
    navigate("/teams");
  };

  // Function to handle user selection
  const handleUserSelect = (userId) => {
    // Check if the user is already selected
    const isSelected = selectedUsers.includes(userId);

    // If the user is selected, remove them from the list; otherwise, add them
    setSelectedUsers((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // const createTeam = async () => {
  //   const response = await createteamfunc();
  //   if (response.status === 200) {
  //     console.log(response.data);
  //   } else {
  //     console.log("error for create team");
  //   }
  // };

  //get user
  const userGet = async () => {
    const response = await userGetfunc(search, gender, status, domain, page);
    // console.log(response);
    // console.log(response.data.Pagination.pageCount);
    if (response.status === 200) {
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  };

  //delete user

  const deleteUser = async (id) => {
    // console.log(id);
    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setDeletedata(response.data);
    } else {
      toast.error("Error");
    }
  };

  //Pagination
  //handle prev btn

  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  //handle netx btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [search, gender, status, domain, page]);

  return (
    <>
      {/* {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.first_name ? useradd.first_name.toUpperCase() : ""} Successfully added
        </Alert>
      ) : null} */}

      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.first_name ? update.first_name.toUpperCase() : ""} Succesfully
          updated
        </Alert>
      ) : (
        ""
      )}

      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.first_name ? useradd.first_name.toUpperCase() : ""}{" "}
          Succesfully Added
        </Alert>
      ) : (
        ""
      )}

      {deletedata ? (
        <Alert variant="danger" onClose={() => setDeletedata("")} dismissible>
          {deletedata.first_name ? deletedata.first_name.toUpperCase() : ""}{" "}
          Succesfully Deleted
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search button */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex" id="ami">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value.trim())}
                />
                <Button variant="outline-success " className="search_btn">
                  Search
                </Button>
              </Form>
            </div>

            <div className="view-teams-btn useful1">
              <Button
                className="btn btn-info"
                variant="primary"
                onClick={viewTeam}
              >
                &nbsp;View Team
              </Button>
            </div>

            <div className="create-btn useful2">
              <Button variant="primary" onClick={createTeam}>
                <FaPlus />
                &nbsp;Create Team
              </Button>
            </div>
            <div className="add-btn useful3">
              <Button variant="primary" onClick={addUser}>
                <FaPlus />
                &nbsp;Add User
              </Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            {/* <div className="export_csv">
              <Button className="export_btn">Export to CSV </Button>
            </div> */}
            <div className="filter-gender">
              <div className="filter">
                <h3>Filter by Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    required
                    label="All"
                    value="All"
                    type="radio"
                    name="gender"
                    onChange={(e) => setGender(e.target.value.trim())}
                    defaultChecked
                  />

                  <Form.Check
                    required
                    label="Male"
                    value="Male"
                    type="radio"
                    name="gender"
                    onChange={(e) => setGender(e.target.value.trim())}
                  />

                  <Form.Check
                    required
                    label="Female"
                    value="Female"
                    type="radio"
                    name="gender"
                    onChange={(e) => setGender(e.target.value.trim())}
                  />
                </div>
              </div>
            </div>

            {/* short by value */}
            <div className="filter_newold">
              <h3>Filter By Domain</h3>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {domain}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setDomain("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setDomain("Sales")}>
                    Sales
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setDomain("Finance")}>
                    Finance
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setDomain("Marketing")}>
                    Marketing
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setDomain("IT")}>
                    IT
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setDomain("Management")}>
                    Management
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setDomain("UI Designing")}>
                    UI Designing
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setDomain("Business Development")}
                  >
                    Business Development
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by avaiavility */}
            <div className="filter-avilability">
              <div className="status">
                <h3>Filter by Availability</h3>
                <div className="status-radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    required
                    label="All"
                    value="All"
                    type="radio"
                    name="status"
                    onChange={(e) => setstatus(e.target.value.trim())}
                    defaultChecked
                  />

                  <Form.Check
                    required
                    label="True"
                    value="True"
                    type="radio"
                    onChange={(e) => setstatus(e.target.value.trim())}
                    name="status"
                  />

                  <Form.Check
                    required
                    label="False"
                    value="False"
                    type="radio"
                    onChange={(e) => setstatus(e.target.value.trim())}
                    name="status"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpin ? (
          <Spiner />
        ) : (
          <Table
            userData={userData}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
            selectedUsers={selectedUsers}
            handleUserSelect={handleUserSelect}
          />
        )}
      </div>
    </>
  );
};

export default Home;
