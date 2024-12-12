export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}${minutes > 0 ? `시 ${minutes}분` : "시"}`;
};

export const formatDateOnly = (isoDateString) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
