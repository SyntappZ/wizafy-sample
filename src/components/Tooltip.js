import React from "react";

const Tooltip = ({ message, toggle, mini }) => {

    const toolStyle = mini ? { whiteSpace: 'nowrap', padding: '10px'} : {padding: '20px'}
  return (
    <>
      {toggle ? (
        <div className="tooltip" style={toolStyle}>
          {message}
        </div>
      ) : null}
    </>
  );
};

export default Tooltip;
