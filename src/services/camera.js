/**
 * Get Camera Video.
 * @param {Boolean} audio
 * @param {Boolean} front
 * @returns {Promise.<TResult>}
 */
export function getCameraVideoSrc ({
  audio = false,
  front = false
} = {}) {
  return navigator.mediaDevices.getUserMedia({
    audio,
    video: {
      facingMode: front ? 'user' : 'environment'
    }
  }).then(stream => {
    return window.URL.createObjectURL(stream)
  })
}
