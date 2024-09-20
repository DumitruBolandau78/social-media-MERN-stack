const useDateFormat = (dateParam) => {
  const date = new Date(dateParam);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`;
  return formattedDate;
}

export default useDateFormat;