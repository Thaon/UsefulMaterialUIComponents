import React from "react";

//USAGE: pass height and width
const Spacer = (props) => {
  return (
    <div style={{ height: props.height, width: props.width }}>
      {props.children}
    </div>
  );
};

export default Spacer;
