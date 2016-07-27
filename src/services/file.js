import generateFileName from '../utils/generateFileName'

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem

/**
 * Save file.
 * @param {Blob} file
 * @returns {Promise}
 */
export function saveFile (file) {
  return new Promise((resolve, reject) => {
    navigator.webkitPersistentStorage.requestQuota(20 * 1024 * 1024, grantedBytes => {
      window.requestFileSystem(window.PERSISTENT, grantedBytes, fs => {
        fs.root.getFile(`/${generateFileName()}.jpg`, { create: true }, fileEntry => {
          fileEntry.createWriter(fileWriter => {
            fileWriter.onwriteend = e => { resolve(e) }
            fileWriter.onerror = e => { reject(e) }
            fileWriter.write(file)
          })
        }, err => { reject(err) })
      }, err => { reject(err) })
    }, err => { reject(err) })
  })
}

export function getAllFiles () {
  return new Promise((resolve, reject) => {
    navigator.webkitPersistentStorage.requestQuota(10 * 1024 * 1024, grantedBytes => {
      window.requestFileSystem(window.PERSISTENT, grantedBytes, fs => {
        const dirReader = fs.root.createReader()
        let entries = []
        const readEntries = () => {
          dirReader.readEntries(results => {
            if (!results.length) {
              resolve(entries)
            } else {
              entries = entries.concat(toArray(results))
              readEntries()
            }
          }, err => { reject(err) })
        }
        readEntries()
      }, err => { reject(err) })
    }, err => { reject(err) })
  })
}

export function getFile (path) {
  return new Promise((resolve, reject) => {
    navigator.webkitPersistentStorage.requestQuota(10 * 1024 * 1024, grantedBytes => {
      window.requestFileSystem(window.PERSISTENT, grantedBytes, fs => {
        fs.root.getFile(path, {}, fileEntry => {
          fileEntry.file(file => {
            console.log(file)
            const reader = new FileReader()
            reader.onloadend = e => {
              resolve(e.target.result)
            }
            reader.readAsDataURL(file)
          }, err => { reject(err) })
        }, err => { reject(err) })
      }, err => { reject(err) })
    }, err => { reject(err) })
  })
}

function toArray (list) {
  return Array.prototype.slice.call(list || [], 0)
}

