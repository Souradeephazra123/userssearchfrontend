import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper.";

export const registerfunc = async (data, header) => {
  return await commonrequest("POST", `${BASE_URL}/user/register`, data, header);
};

export const userGetfunc = async (search, gender, status, domain, page) => {
  return await commonrequest(
    "GET",
    `${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&domain=${domain}&page=${page}`,
    ""
  );
};

export const singleUsergetfunc = async (id) => {
  return await commonrequest("GET", `${BASE_URL}/user/${id}`, "");
};

export const editfunc = async (id, data, header) => {
  return await commonrequest(
    "PUT",
    `${BASE_URL}/user/edit/${id}`,
    data,
    header
  );
};

export const deletefunc = async (id) => {
  return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
};

export const statuschangefunc = async (id, data) => {
  return await commonrequest("PUT", `${BASE_URL}/user/status/${id}`, {
    data,
  });
};

//crete team
export const createteamfunc = async (data) => {
  return await commonrequest("POST", `${BASE_URL}/team`, data);
};
export const getteamfunc = async () => {
  return await commonrequest("GET", `${BASE_URL}/team`, "");
};

export const getteamdetailsfunc = async (id) => {
  return await commonrequest("GET", `${BASE_URL}/team/${id}`, "");
};


export const viewTeamById = async (id) => {
  return await commonrequest("GET", `${BASE_URL}/team/${id}`, "");
};
// export const deleteteamfunc = async (id) => {
//   return await commonrequest("DELETE", `${BASE_URL}/team/${id}`, "");
// }
// export const updateteamfunc = async (id, data) => {
//   return await commonrequest("PUT", `${BASE_URL}/team/${id}`, data);
// }
// export const addmemberfunc = async (id, data) => {
//   return await commonrequest("PUT", `${BASE_URL}/team/add/${id}`, data);
// }
// export const removememberfunc = async (id, data) => {
//   return await commonrequest("PUT", `${BASE_URL}/team/remove/${id}`, data);
// }
// export const getallteamfunc = async () => {
//   return await commonrequest("GET", `${BASE_URL}/team/all`, "");
// }
// export const getallmemberfunc = async () => {
//   return await commonrequest("GET", `${BASE_URL}/team/member`, "");
// }
// export const getallteamwithmemberfunc = async () => {
//   return await commonrequest("GET", `${BASE_URL}/team/allwithmember`, "");
// }
// export const getallteamwithmemberbyidfunc = async (id) => {
//   return await commonrequest("GET", `${BASE_URL}/team/allwithmember/${id}`, "");
// }
