import React, { useCallback } from 'react'
import { MermaidRenderer } from '../mermaid/MermaidRenderer'

interface HCardProps {
  title: string
  mermaidCode: string
  onPointerUp: (mermaidCode: string, event: PointerEvent) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export const MermaidCard: React.FC<HCardProps> = ({ title, mermaidCode, onPointerUp }) => {
  const pointerUp = useCallback(
    (evt) => {
      onPointerUp(mermaidCode, evt)
    },
    [mermaidCode],
  )

  return (
    <div className="mb-1 mr-2" onPointerUp={pointerUp}>
      <div className="flex flex-col bg-gray-700">
        <h5 className="text-gray-300 text-m font-medium m-2">{title}</h5>
        <MermaidRenderer mermaidCode={mermaidCode} onParseError={noop} rendererClassName={''} />
      </div>
    </div>
  )
}
