export function truncateNoFim(url, maxLength) {
  if (url.length <= maxLength) {
    return url
  } else {
    return url.slice(0, maxLength) + '...'
  }
}

export function truncateNoMeio(fileName, maxLength) {
  if (fileName.length > maxLength) {
    const firstHalfLength = Math.ceil(maxLength / 2)
    const secondHalfLength = Math.floor(maxLength / 2)
    const firstHalf = fileName.slice(0, firstHalfLength)
    const secondHalf = fileName.slice(-secondHalfLength)
    return `${firstHalf} ... ${secondHalf}`
  }
  return fileName
}
