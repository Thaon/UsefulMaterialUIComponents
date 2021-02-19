import React, { useState, useEffect } from "react";
import ops from "../operations";

export const Context = React.createContext();

const AppStateContext = (props) => {
  const [isCustomerRes, setCustomerRes] = useState(null);

  useEffect(() => {
    async function GetResStatusAsync() {
      let isc = await ops.isCustomerOrResource();
      setCustomerRes(isc);
    }

    GetResStatusAsync();
  }, [ops.myResourceInfo]);

  return (
    <Context.Provider value={{ isCustomerRes }}>
      {props.children}
    </Context.Provider>
  );
};

export default AppStateContext;
