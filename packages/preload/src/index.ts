import { contextBridge, ipcRenderer } from 'electron'
import { IpcChannelLabel } from '../../common/consts'
import { getMonacoPath } from './monaco'

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
  send: (channel: string, data: any) => {
    const validChannels = [IpcChannelLabel.Menu]
    if (validChannels.includes(channel as IpcChannelLabel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel: string, func: any) => {
    const validChannels = [IpcChannelLabel.Menu]
    if (validChannels.includes(channel as IpcChannelLabel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },
})

contextBridge.exposeInMainWorld('monacoLoader', {
  path: getMonacoPath(),
})
