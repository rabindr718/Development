import React from 'react';
import './ToggleSwitch.css';
interface PropTypes extends React.InputHTMLAttributes<HTMLInputElement> {}
const ToggleSwitch = ({ ...rest }: PropTypes) => {
  return (
    <label className="switch">
      <input type="checkbox" {...rest} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
