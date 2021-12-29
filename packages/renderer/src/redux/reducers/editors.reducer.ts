import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { editor } from 'monaco-editor'
import IMarkerData = editor.IMarkerData

interface EditorsState {
  currentEditorId: string
  instances: Record<string, EditorData>
}

export interface EditorData {
  filename: string | null
  editorInput: string
  errorMarkers: IMarkerData[]
}

function initEditorData() {
  return {
    filename: null,
    editorInput: '',
    errorMarkers: [],
  }
}

const initialState: EditorsState = {
  currentEditorId: '',
  instances: {},
}

export const editorsSlice = createSlice({
  name: 'editors',
  initialState,
  reducers: {
    addEditor: (state, action: PayloadAction<{ editorId: string }>) => {
      const { editorId } = action.payload
      state.instances[editorId] = initEditorData()
      state.currentEditorId = editorId
    },
    removeEditor: (state, action: PayloadAction<{ editorId: string }>) => {
      const { editorId } = action.payload

      delete state.instances[editorId]
    },
    addEditorError: (state, action: PayloadAction<{ err: any }>) => {
      const editorId = state.currentEditorId

      const editorState = state.instances[editorId]

      if (!editorState) {
        return
      }

      const err = action.payload.err

      const marker: IMarkerData = {
        severity: 8, //Error
        startLineNumber: err.hash.loc.first_line,
        startColumn: err.hash.loc.first_column,
        endLineNumber: err.hash.loc.last_line,
        endColumn: err.hash.loc.last_column + 1,
        message: err.str,
      }

      editorState.errorMarkers.push(marker)
      // Clear all previous errors before this error.
      editorState.errorMarkers = editorState.errorMarkers.filter(
        (m) => m.startLineNumber >= marker.startLineNumber && m.startColumn >= marker.startColumn,
      )
    },
    clearEditorErrors: (state) => {
      const editorId = state.currentEditorId

      const editorState = state.instances[editorId]

      if (!editorState) {
        return
      }

      editorState.errorMarkers = []
    },
    setEditorInput: (state, action: PayloadAction<{ input: string }>) => {
      const editorId = state.currentEditorId

      const editorState = state.instances[editorId]

      if (!editorState) {
        return
      }

      editorState.errorMarkers = []
      editorState.editorInput = action.payload.input
    },
    setActiveEditor: (state, action: PayloadAction<{ editorId: string }>) => {
      const { editorId } = action.payload
      state.currentEditorId = editorId
    },
    insertEditorInput: (state, action: PayloadAction<{ input: string }>) => {
      const editorId = state.currentEditorId
      const editorState = state.instances[editorId]

      if (!editorState) {
        return
      }

      editorState.editorInput += action.payload.input
    },
  },
})

export const {
  setActiveEditor,
  addEditor,
  addEditorError,
  clearEditorErrors,
  setEditorInput,
  removeEditor,
  insertEditorInput,
} = editorsSlice.actions

export default editorsSlice.reducer
