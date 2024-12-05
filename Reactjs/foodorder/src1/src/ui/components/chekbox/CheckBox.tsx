import React from 'react';
import './check.css'; // Import CSS file for styling

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  indeterminate?: boolean;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  indeterminate,
  disabled,
}) => {
  const getClassNames = () => {
    let classNames = 'checkbox';
    if (indeterminate) {
      classNames += ' indeterminate';
    } else if (checked) {
      classNames += ' checked';
    }
    if (disabled) {
      classNames += ' disabled'; // Add the disabled class
    }
    return classNames;
  };

  const handleMinusSignClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent event from bubbling up to the parent elements
    onChange(); // Trigger onChange event to deselect the row
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={getClassNames()}
        disabled={disabled}
      />
      {indeterminate && (
        <span className="minus-sign" onClick={handleMinusSignClick}>
          -
        </span>
      )}
    </div>
  );
};

export default CheckBox;
