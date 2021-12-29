import { protocol } from 'electron'
import { FILE_PROTOCOL_NAME } from '../../common/consts'

export function registerSafeFileProtocol() {
  protocol.registerFileProtocol(FILE_PROTOCOL_NAME, (request, callback) => {
    const url = request.url.replace(`${FILE_PROTOCOL_NAME}://`, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURIComponent(url)
    try {
      return callback(decodedUrl)
    } catch (error) {
      console.error('ERROR: main | registerSafeFileProtocol | Could not get file path', error)
    }
  })
}
