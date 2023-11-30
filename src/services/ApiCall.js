import axios from "axios";

export const commonrequest = async (methods, url, body, header) => {
  let config = {
    method: methods,
    url,
    //In your ApiCall.js file, when using FormData, make sure that the Content-Type is set to undefined or not set at all. Axios should automatically set the correct Content-Type for FormData.
    headers:{
    //  header ? header : { "Content-Type": "application/json" }
    },data: body, 
  };

  //axios instance
  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
