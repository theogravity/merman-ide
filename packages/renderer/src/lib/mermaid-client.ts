import mermaid from 'mermaid'
import { nanoid } from 'nanoid'
import { editor } from 'monaco-editor'
import { getLogger } from '../../../common/logger'
import IMarkerData = editor.IMarkerData

mermaid.initialize({ startOnLoad: false })

function mermaidRenderCallback(renderToElement: Element) {
  return (svgCode: string, bindFunctions: (_element: Element) => void) => {
    renderToElement.innerHTML = svgCode
    if (bindFunctions) {
      bindFunctions(renderToElement)
    }
  }
}

interface RenderMermaidDiagram {
  mermaidCode: string
  renderToElement: Element
  onParseError: (err: IMarkerData) => void
}

export function renderMermaidDiagram({ mermaidCode, renderToElement, onParseError }: RenderMermaidDiagram) {
  const svgId = nanoid()
  const log = getLogger()

  if (!mermaidCode) {
    return
  }

  log.info('Rendering mermaid diagram')

  try {
    if (mermaid.parse(mermaidCode)) {
      mermaid.render(svgId, mermaidCode, mermaidRenderCallback(renderToElement), renderToElement)
    }
  } catch (e: any) {
    if (e.hash) {
      onParseError(e)
    } else {
      log.errorOnly(e)
    }
  }
}
