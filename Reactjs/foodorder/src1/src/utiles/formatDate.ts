// Utility function to format date string into "YYYY-MM-DD" format
// Utility function to format date string into "YYYY-MM-DD" format
// Utility function to format date string into "YYYY-MM-DD" format
import { format } from 'date-fns';
export const formatDate = (dateString: string, inputFormat: string) => {
  // Remove whitespace characters from the date string
  const trimmedDateString = dateString.trim();

  // Split the date string into day, month, and year components
  const [month, day, year] = trimmedDateString.split(/\D+/);

  // Validate if all components are present and numeric
  if (
    month &&
    day &&
    year &&
    !isNaN(parseInt(month)) &&
    !isNaN(parseInt(day)) &&
    !isNaN(parseInt(year))
  ) {
    // Construct a new Date object using the components
    const formattedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    // Format the components into "YYYY-MM-DD" format
    const formattedYear = formattedDate.getFullYear();
    const formattedMonth = String(formattedDate.getMonth() + 1).padStart(
      2,
      '0'
    );
    const formattedDay = String(formattedDate.getDate()).padStart(2, '0');

    // Return the formatted date string
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  // If any component is missing or invalid, return a default date
  return '2024-04-01';
};

export const getCurrentDateFormatted = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const dateFormat = (date: string) => {
  if (!date) {
    return '';
  }
  const isValid = new Date(date);
  if (isValid) {
    return format(new Date(date), 'dd-MM-yyyy');
  } else {
    return '';
  }
};

export const monthDateFormat = (date: string) => {
  if (!date) {
    return '';
  }
  const isValid = new Date(date);
  if (isValid) {
    return format(new Date(date), 'MM-dd-yyyy'); // Corrected format
  } else {
    return '';
  }
};
