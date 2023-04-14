export const getTime = () => {
    const timeStamp = Date.now();
    return timeStamp;
  };
  
  export const getIsoString = (timeStamp) => {
    const date = new Date(timeStamp);
    const isoString = date.toISOString();
    return isoString;
  }

 export const msToTime = (s) => {
    // Pad to 2 or 3 digits, default is 2
  var pad = (n, z = 2) => ('00' + n).slice(-z);
  return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0) + '.' + pad(s%1000, 3);
}

export const msToFormattedString = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);
  
    let result = "";
  
    if (years > 0) {
      result += `${years} years `;
    }
    if (months > 0) {
      result += `${months % 12} months `;
    }
    if (weeks > 0) {
      result += `${Math.floor(days / 7) % 4} weeks `;
    }
    if (days > 0) {
      result += `${days % 7} days `;
    }
    if (hours > 0) {
      result += `${hours % 24} hours `;
    }
    if (minutes > 0) {
      result += `${minutes % 60} minutes `;
    }
    if (seconds > 0) {
      result += `${seconds % 60} seconds`;
    }
  
    return result.trim();
  }
  