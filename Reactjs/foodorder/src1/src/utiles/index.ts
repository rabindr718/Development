import { Dispatch, SetStateAction } from 'react';
import { postCaller } from '../infrastructure/web_api/services/apiUrl';
import {
  format,
  parse,
  addMinutes,
  differenceInHours,
  setHours,
  setMinutes,
  differenceInMinutes,
} from 'date-fns';
export const firstCapitalize = (str: string) => {
  const key = str[0].toUpperCase() + str.slice(1, str.length);
  return key;
};
export const sendMail = ({
  toMail,
  message,
  subject,
  html_content,
}: {
  toMail: string;
  message: string;
  subject: string;
  html_content: string;
}) => {
  return postCaller('sendmail', {
    subject,
    message,
    to_mail: toMail,
    html_content,
  });
};

export const checkLastPage = (
  current: number,
  total: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  rows: number,
  totalPageData: number
) => {
  if (current === total && current > 1 && rows === totalPageData) {
    setCurrentPage((prev) => prev - 1);
  }
  return;
};
export const generateTimeArray = (start: string, end: string) => {
  const startTime = parse(start, 'h:mm aa', new Date());
  const endTime = parse(end, 'h:mm aa', new Date());
  const timeArray = [];

  let currentTime = startTime;
  while (currentTime <= endTime) {
    timeArray.push(format(currentTime, 'h:mm aa'));
    currentTime = addMinutes(currentTime, 30);
  }
  return timeArray;
};

export const timeDifference = (time1: string, time2: string) => {
  let date1 = parse(time1, 'h:mm a', new Date());
  let date2 = parse(time2, 'h:mm a', new Date());

  // Set both dates to the same day
  const baseDate = new Date(2000, 0, 1); // An arbitrary date
  date1 = setMinutes(setHours(baseDate, date1.getHours()), date1.getMinutes());
  date2 = setMinutes(setHours(baseDate, date2.getHours()), date2.getMinutes());

  // Calculate the difference in minutes
  let diff = differenceInMinutes(date2, date1);

  // If the difference is negative, add 24 hours (in minutes)
  if (diff < 0) {
    diff += 24 * 60;
  }

  return diff / 60;
};
