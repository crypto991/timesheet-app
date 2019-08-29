const getDate = () => {
  const dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  //IF YOU WANT DATE WITH ZEROS COMMENT THIS TWO IF STATEMENTS

  // month = month.toString();
  // if (!month[1]) {
  //   month = `0${month}`;
  // }
  // day = day.toString();
  // if (!day[1]) {
  //   day = `0${day}`;
  // }

  return `${day}-${month}-${year}`;
};

export default getDate;
