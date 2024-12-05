import React from 'react';

interface BoxProps {
  width: number;
  height: number;
  color: string;
  borderRadius?: number;
  borderColor?: string; // Added optional borderColor prop
}

const Box: React.FC<BoxProps> = ({
  width,
  height,
  color,
  borderRadius = 0,
  borderColor, // Optional borderColor prop
}) => {
  const boxStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    borderRadius: `${borderRadius}%`,
    border: borderColor ? `3px solid ${borderColor}` : 'none',
    flexShrink: 0,
  };

  return <div style={boxStyle}></div>;
};

interface BoxesProps {
  color: string;
  borderColor?: string; // Added optional borderColor prop
}

const Boxes: React.FC<BoxesProps> = ({ color, borderColor }) => {
  return (
    <div>
      <Box
        width={18}
        height={18}
        color={color}
        borderRadius={50}
        borderColor={borderColor}
      />
    </div>
  );
};

export default Boxes;
