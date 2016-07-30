/**
 * Create file name of image.
 * @returns {string}
 */
export default function () {
  const day = new Date()
  return day.getTime().toString()
}
