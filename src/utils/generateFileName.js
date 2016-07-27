/**
 * Create file name of image.
 * @returns {string}
 */
export default function () {
  const day = new Date()
  return `${day.getFullYear()}${day.getMonth() + 1}${day.getDate()}${Math.random().toString(36).substring(2, 6)}`
}
