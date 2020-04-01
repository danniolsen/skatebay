// left lesser than right 2 < 3
// left larger than right 3 > 2

const timeAgo = (dateTime) => {
  const timeNow = new Date();
  const uploadDate = new Date(dateTime);

  const diff = Math.abs(timeNow - uploadDate);

  const minutes = diff / (1000 * 60);
  const hours = diff / (1000 * 60 * 60);
  const days = diff / (1000 * 60 * 60 * 24);
  const months = diff / (1000 * 60 * 60 * 24 * 30.5);
  const years = diff / 31536000000;

  const resently = () => {
    const min = minutes.toFixed();
    const hourStr = hours.toString();
    const hour = hourStr.substring(0, 1);

    if (minutes < 5) {
      return "Now";
    } if (minutes > 4.9 && minutes < 59.9) {
      return `${minutes.toFixed() } minutes ago`;
    } if (hour === "1") {
      return `${hour } hour ago`;
    }
    return `${hour } hours ago`;
  };

  if (diff < 86400000) {
    return resently();
  } if (diff > 86400000 && diff < 2592000000) {
    return `${days.toFixed()} days ago`;
  } if (diff > 2592000000 && diff < 31556952000) {
    return months.toFixed() > 1
      ? `${months.toFixed()} months ago`
      : `${months.toFixed()} month ago`;
  } if (diff > 31104000000 && diff < 31881600000) {
    return `${years.toFixed()} year ago`;
  } if (diff > 31881600000 && diff < 62208000000) {
    return "More than 1 year ago";
  }
  return `${years.toFixed()} years ago`;
};

/*
  let hour = hours.toString().split(".");

  if (minutes < 15) {
    return "Now";
  } else if (Number(hour[0]) === 0 && minutes > 15 && minutes < 59) {
    return minutes.toFixed() + " minutes ago";
  } else if (Number(hour[0]) !== 0 && Number(hour[0]) > 1) {
    return Number(hour[0]) + " hour ago";
  }
  */

export default timeAgo;
