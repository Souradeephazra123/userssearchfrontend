import React from "react";
import "./Tables.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Paginations from "../Paginations/Paginations";
import { HiDotsVertical } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BASE_URL } from "../../services/helper.";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../services/Apis";
import { Form } from "react-bootstrap";
const Tables = ({
  userData,
  deleteUser,
  userGet,
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
  selectedUsers,
  handleUserSelect,
}) => {
  const handleChange = async (id, status) => {
    // console.log(id, status);
    const response = await statuschangefunc(id, status);
    // console.log(response);
    if (response.status === 200) {
      userGet();
      toast.success("Status Updated!");
    } else {
      toast.error("Error!");
    }
  };

  return (
    <div className="container">
      <Row>
        <div className="col  mt-2">
          <Card className="shadow">
            <Table className="align-items-center" responsive="sm">
              <thead className="thead-dark">
                <tr className="table-dark">
                  <th>id</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>status</th>
                  <th>Domain</th>
                  <th>profile</th>
                  <th>action</th>
                  <th>Click here</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((element, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1 + (page - 1) * 50}</td>
                          <td>
                            {element.first_name + " " + element.last_name}
                          </td>
                          <td>{element.email}</td>
                          <td>{element.gender === "Male" ? "M" : "F"} </td>
                          <td className="d-flex align-items-center">
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                className="dropdown_btn"
                                id="dropdown-basic"
                              >
                                <Badge
                                  bg={
                                    element.status === "True"
                                      ? "primary"
                                      : "danger"
                                  }
                                >
                                  {element.status} <IoIosArrowDown />
                                </Badge>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "True")
                                  }
                                >
                                  True
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "False")
                                  }
                                >
                                  False
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{element.domain}</td>
                          <td className="img_parent">
                            {/* <img
                              src={`${BASE_URL}/Uploads/${element.profile}`}
                              alt=""  
                            /> */}
                            {/* <img src={element.imageURL} alt="User Profile" /> */}
                            {element.profile &&
                            element.profile.startsWith("http") ? (
                              <img src={element.profile} alt="Web Profile" />
                            ) : (
                              <img
                                src={`${BASE_URL}/Uploads/${element.profile}`}
                                alt="User Profile"
                              />
                            )}
                          </td>
                          <td>
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                variant="light"
                                className="action"
                                id="dropdown-basic"
                              >
                                <HiDotsVertical />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/userprofile/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <FaEye className="eye" />
                                    &nbsp; View
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/edit/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <FaEdit className="edit" />
                                    &nbsp;Edit
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div onClick={() => deleteUser(element._id)}>
                                    <MdDelete className="delete" />
                                    &nbsp;Delete
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              id={`userCheckbox-${element._id}`}
                              label=""
                              checked={selectedUsers.includes(element._id)}
                              onChange={() => handleUserSelect(element._id)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <div className="no_data text-center">NO Data found</div>
                )}
              </tbody>
            </Table>
            <Paginations
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              page={page}
              pageCount={pageCount}
              setPage={setPage}
            />
          </Card>
        </div>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Tables;
