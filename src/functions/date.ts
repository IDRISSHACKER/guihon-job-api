import { decodeTime, ULID } from 'ulidx';

const timeStampToDate = (timestamp: number): Date => {
  const date = new Date(timestamp);

  return date;
};

export const ulidToDate = (ulid: ULID): Date => {
  const timeStamp = decodeTime(ulid);

  const date = timeStampToDate(timeStamp);

  return date;
};
