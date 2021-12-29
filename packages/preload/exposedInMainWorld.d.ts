import { IpcChannelLabel } from "../common/consts";

interface Window {
  readonly ipc: {
    send: <T>(channel: IpcChannelLabel, data: T) => void;
    receive: (channel: IpcChannelLabel, cb: (...args: any[]) => void) => void;
  }
  readonly monacoLoader: { path: string; };
}
