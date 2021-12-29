import { useAppSelector } from '../redux/hooks'

export function useGetEditorById(editorId: string): EditorData {
  const editorState = useAppSelector((state) => state.editors.instances)

  if (!editorId) {
    return null
  }

  return editorState[editorId]
}
