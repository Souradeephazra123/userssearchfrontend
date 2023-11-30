import React, { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const dltdata = createContext();

const ContextProvider = ({ children }) => {
  const [useradd, setUseradd] = useState("");
  const [update, setUpdate] = useState("");
  const [deletedata, setDeletedata] = useState(""); 
  return (
    <div>
      <addData.Provider value={{ useradd, setUseradd }}>
        <updateData.Provider value={{ update, setUpdate }}>
          <dltdata.Provider value={{ deletedata, setDeletedata }}>
            {children}
          </dltdata.Provider>
        </updateData.Provider>
      </addData.Provider>
    </div>
  );
};

export default ContextProvider;
