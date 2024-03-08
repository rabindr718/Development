const DatePicker: React.FC = () => {
  let new_Date: Date = new Date();

  let result: string = new_Date.toLocaleString();

  return <>{result}</>;
};
export default DatePicker;
