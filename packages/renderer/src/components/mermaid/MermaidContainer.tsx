import React, { useCallback, useEffect } from 'react'
import { Allotment } from 'allotment'
import { addEditor, addEditorError, removeEditor, setEditorInput } from '../../redux/reducers/editors.reducer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import MermaidEditor from './MermaidEditor'
import { MermaidRenderer } from './MermaidRenderer'

interface MermaidContainerProps {
  editorId: string
}

export const MermaidContainer: React.FC<MermaidContainerProps> = ({ editorId }) => {
  const dispatch = useAppDispatch()
  const editorState = useAppSelector((state) => state.editors.instances[editorId])

  useEffect(() => {
    dispatch(addEditor({ editorId }))

    return () => {
      dispatch(removeEditor({ editorId }))
    }
  }, [editorId])

  const onParseError = useCallback(
    (e) => {
      dispatch(addEditorError({ err: e }))
    },
    [editorId],
  )

  const onInputChange = useCallback(
    (input) => {
      dispatch(setEditorInput({ input }))
    },
    [editorId],
  )

  return (
    <Allotment vertical={true}>
      <MermaidEditor editorId={editorId} onChange={onInputChange} errorMarkers={editorState?.errorMarkers} />
      <MermaidRenderer
        className="w-screen"
        mermaidCode={editorState?.editorInput}
        onParseError={onParseError}
        rendererClassName="bg-white"
      />
    </Allotment>
  )
}
