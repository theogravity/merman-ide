import { resolve, join } from 'path'
import { FILE_PROTOCOL_NAME } from '../../common/consts'

function ensureFirstBackSlash(str: string) {
  return str.length > 0 && str.charAt(0) !== '/' ? '/' + str : str
}

function uriFromPath(_path: string) {
  const pathName = resolve(_path).replace(/\\/g, '/')
  return encodeURI(FILE_PROTOCOL_NAME + '://' + ensureFirstBackSlash(pathName))
}

export function getMonacoPath() {
  return uriFromPath(join(__dirname, '../../../node_modules/monaco-editor/min/vs'))
}
