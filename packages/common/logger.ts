import pino, { P } from 'pino'
import { LogLayer, LoggerType } from 'loglayer'

const p = pino({
  level: 'trace',
})

const log = new LogLayer<P.Logger>({
  logger: {
    instance: p,
    type: LoggerType.PINO,
  },
})

export function getLogger() {
  return log
}
