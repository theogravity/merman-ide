import React, { useEffect, useRef } from 'react'
import Editor, { loader, useMonaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { initEditor } from '../../lib/mermaid-language'
import { useGetEditorById } from '../../hooks/editor'

import IMarkerData = editor.IMarkerData
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
}

loader.config({
  paths: {
    vs: window.monacoLoader.path,
  },
})

interface MermaidEditorParams {
  onChange: (value: string | undefined, ev: editor.IModelContentChangedEvent) => void
  errorMarkers: IMarkerData[]
  editorId: string
}

const MermaidEditor: React.FC<MermaidEditorParams> = ({ onChange, errorMarkers, editorId }) => {
  const editorState = useGetEditorById(editorId)
  const monaco = useMonaco()
  const editorRef = useRef<IStandaloneCodeEditor | null>(null)

  function handleEditorDidMount(editor: IStandaloneCodeEditor) {
    editorRef.current = editor
  }

  useEffect(() => {
    if (monaco) {
      initEditor(monaco)
    }
  }, [monaco])

  useEffect(() => {
    if (editorRef.current && errorMarkers) {
      const model = editorRef.current?.getModel()

      if (model) {
        editor && monaco?.editor.setModelMarkers(model, 'test', errorMarkers)
      }
    }
  }, [editorRef.current, errorMarkers])

  return (
    <div className="h-screen">
      <Editor
        onMount={handleEditorDidMount}
        onChange={onChange}
        theme={'vs-dark'}
        options={editorOptions}
        language="mermaid"
        value={editorState?.editorInput}
      />
    </div>
  )
}

export default MermaidEditor
