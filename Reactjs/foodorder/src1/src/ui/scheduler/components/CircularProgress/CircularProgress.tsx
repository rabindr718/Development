import React from 'react';
import styles from './styles/index.module.css';
interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  emptyColor?: string;
  filledColor?: string;
  children?: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 200,
  strokeWidth = 15,
  emptyColor = '#e0e0e0',
  filledColor = '#3f51b5',
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className={`absolute ${styles.svg_wrapper} ${styles['top-0']} ${styles['left-0']}`}
        width={size}
        height={size}
      >
        <circle
          stroke={emptyColor}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={filledColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        className={`absolute ${styles['top-0']} ${styles['left-0']} flex items-center justify-center`}
        style={{ width: '100%', height: '100%', flexShrink: 0 }}
      >
        {children ? (
          children
        ) : (
          <div className="text-2xl font-bold">{`${progress}%`}</div>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
