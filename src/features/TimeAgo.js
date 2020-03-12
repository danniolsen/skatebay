// left lesser than right 2 < 3
// left larger than right 3 > 2

const timeAgo = dateTime => {
  let timeNow = new Date("2020-03-12 12:00:00");
  //let uploadDate = new Date(dateTime);
  let uploadDate = new Date("2018-01-01 12:00:00");
  let diff = Math.abs(timeNow - uploadDate);

  let minutes = diff / (1000 * 60);
  let hours = diff / (1000 * 60 * 60);
  let days = diff / (1000 * 60 * 60 * 24);
  let months = diff / (1000 * 60 * 60 * 24 * 30.5);
  let years = diff / 31536000000;

  let resently = () => {
    let min = minutes.toFixed();
    let hourStr = hours.toString();
    let hour = hourStr.substring(0, 1);

    if (minutes < 5) {
      return "Now";
    } else if (minutes > 4.9 && minutes < 59.9) {
      return minutes.toFixed() + " minutes ago";
    } else if (hour === "1") {
      return hour + " hour ago";
    } else {
      return hour + " hours ago";
    }
  };

  if (diff < 86400000) {
    return resently();
  } else if (diff > 86400000 && diff < 2592000000) {
    return days.toFixed() + " days ago";
  } else if (diff > 2592000000 && diff < 31556952000) {
    return months.toFixed() > 1
      ? months.toFixed() + " months ago"
      : months.toFixed() + " month ago";
  } else if (diff > 31104000000 && diff < 31881600000) {
    return years.toFixed() + " year ago";
  } else if (diff > 31881600000 && diff < 62208000000) {
    return "More than 1 year ago";
  } else {
    return years.toFixed() + " years ago";
  }
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
