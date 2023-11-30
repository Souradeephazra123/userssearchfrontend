import React, { useState, useEffect } from "react";
import "./TeamList.css";
import { viewTeamById, getteamfunc } from "../../services/Apis";
import Modal from "../../components/Modal/Modal"; // Adjust the import path based on your project structure
import { useNavigate } from "react-router-dom";
const TeamList = () => {
  // ... (previous TeamList code)
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teams when the component mounts
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await getteamfunc();
      setTeams(response.data || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleViewDetails = async (teamId) => {
    try {
      const response = await viewTeamById(teamId);
      const teamDetails = response.data;

      // Set the selected team and show the modal
      setSelectedTeam(teamDetails);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  const closeModal = () => {
    // Hide the modal when the close button is clicked
    setShowModal(false);
  };

  return (
    <div className="container-team">
      {/* ... (previous TeamList code) */}
      <h1>Teams List</h1>
      <ul>
        {teams.map((team, index) => (
          <li className="list" key={team._id}>
            <p>Team {index + 1}</p>
            <p>Team ID: {team._id} </p>
            <p>Team Members:</p>
            <ul>
              {team.members.map((member,index) => (
                <li key={member._id}>
                  <p>
                    Member {index + 1} Name: {member.first_name}{" "}
                    {member.last_name}
                  </p>
                </li>
              ))}
            </ul>
            <button onClick={() => handleViewDetails(team._id)}>
              View Details
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div
          className="modal-container"
          style={{ height: "80%", overflowY: "auto" }}
        >
          <Modal onClose={closeModal}>
            {/* Render the team details inside the modal */}
            <h2>Team Details</h2>
            {selectedTeam && (
              <div>
                <p>Team ID: {selectedTeam._id}</p>
                {/* Display additional team details based on your actual data structure */}
                {/* <p>Team Name: {selectedTeam.name}</p> */}
                <p>Team Members:</p>
                <ul>
                  {selectedTeam.members.map((member, index) => (
                    <li key={member._id}>
                      <div
                        className="member-box"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          marginBottom: "10px",
                          padding: "10px",
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <p>Member {index + 1}</p>
                        <p>
                          Name:&nbsp; {member.first_name} {member.last_name}
                        </p>
                        <p>Email: &nbsp; {member.email}</p>
                        {/* <p>Member Mobile:&nbsp;{member.mobile}</p> */}
                        <p> Gender:&nbsp;{member.gender}</p>
                        <p> Availability:&nbsp;{member.status}</p>
                        <p> Domain:&nbsp;{member.domain}</p>
                        <p> Location:&nbsp;{member.location}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default TeamList;
