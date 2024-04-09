export function truncateUrl(url, maxLength) {
    if (url.length <= maxLength) {
      return url;
    } else {
      return url.slice(0, maxLength) + '...'; 
    }
  }