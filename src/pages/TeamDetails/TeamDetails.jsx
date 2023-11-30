// // TeamDetails.js

// import React, { useState, useEffect } from "react";
// import { getteamdetailsfunc, viewTeamById } from "../../services/Apis";
// import { useParams } from "react-router-dom";

// const TeamDetails = () => {
//   const { teamId } = useParams();
//   // console.log("team id", teamId);
//   const [teamDetails, setTeamDetails] = useState(null);

//   useEffect(() => {
//     // Fetch team details when the component mounts
//     fetchTeamDetails();
//   }, []);

//   const fetchTeamDetails = async () => {
//     try {
//       const response = await getteamdetailsfunc(teamId);
//       console.log(response.data);
//       // Assuming the response contains details about the team
//       setTeamDetails(response.data || null); // Use null if response.data is undefined
//     } catch (error) {
//       console.error("Error fetching team details:", error);
//     }
//   };

//   if (!teamDetails) {
//     return <p>Loading team details...</p>;
//   }

//   return (
//     <div>
//       <h2>Team Details</h2>
//       <p>Team ID: {teamDetails._id}</p>
//       {/* Display additional team details based on your actual data structure */}
//       {/* Example: */}
//       <p>Team Name: {teamDetails.name}</p>
//       <p>Team Members:</p>
//       <ul>
//         {teamDetails.members.map((member) => (
//           <li key={member._id}>
//             {/* Display information about each team member */}
//             <p>
//               Member Name: {member.first_name} {member.last_name}
//             </p>
//             {/* Add more member details as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TeamDetails;
