import React, { useEffect, useRef } from 'react'
import { editor } from 'monaco-editor'
import { renderMermaidDiagram } from '../../lib/mermaid-client'
import IMarkerData = editor.IMarkerData
import classNames from 'classnames'

interface MermaidRendererParams {
  mermaidCode: string
  onParseError: (err: IMarkerData) => void
  className?: string
  rendererClassName: string
}

export const MermaidRenderer: React.FC<MermaidRendererParams> = ({
  rendererClassName,
  mermaidCode,
  onParseError,
  className,
}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      renderMermaidDiagram({
        mermaidCode: mermaidCode,
        renderToElement: elementRef.current,
        onParseError,
      })
    }
  }, [mermaidCode, elementRef.current])

  return (
    <div className={classNames(className, 'overflow-auto mx-1 mb-1 bg-white justify-center')}>
      <div ref={elementRef} className={rendererClassName} />
    </div>
  )
}
