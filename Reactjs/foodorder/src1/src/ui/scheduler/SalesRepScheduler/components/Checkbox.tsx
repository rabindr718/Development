import React from 'react';
import './CheckboxSlider.css';

interface CheckboxSliderProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxSlider: React.FC<CheckboxSliderProps> = ({ checked, onChange }) => {
  const handleToggle = () => {
    onChange(!checked); // Call the onChange function passed from parent
  };

  return (
    <label className="checkbox-slider">
      <input type="checkbox" checked={checked} onChange={handleToggle} />
      <span className="check-slider"></span>
    </label>
  );
};

export default CheckboxSlider;
