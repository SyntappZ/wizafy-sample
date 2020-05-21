import React from "react";

const ToggleSwitch = ({ setIsChecked }) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={setIsChecked} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
