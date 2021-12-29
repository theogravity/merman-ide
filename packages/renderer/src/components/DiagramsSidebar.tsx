import React, { useCallback } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { insertEditorInput, setEditorInput } from '../redux/reducers/editors.reducer'
import { MermaidCard } from './ui/MermaidCard'

const FLOW_CHART_CODE = `flowchart LR
    Start --> Stop
`

const SEQ_DIAGRAM_CODE = `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hi Bob
`

const CLASS_DIAGRAM_CODE = `classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : +Bigdecimal balance
`

const STATE_DIAGRAM_CODE = `stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Crash
    Crash --> [*]
`

const ER_DIAGRAM_CODE = `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
`

const USER_JOURNEY_CODE = `journey
    title My working day
    section Go to work
      Make tea: 5: Me
`

const GANTT_CHART_CODE = `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
`

const PIE_CHART_CODE = `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
`

export const DiagramsSidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const onPointerUp = useCallback((mermaidCode) => {
    dispatch(
      setEditorInput({
        input: '',
      }),
    )
    dispatch(
      insertEditorInput({
        input: mermaidCode,
      }),
    )
  }, [])

  return (
    <div className="bg-gray-900 h-screen mr-2">
      <MermaidCard title="Flow Chart" mermaidCode={FLOW_CHART_CODE} onPointerUp={onPointerUp} />
      <MermaidCard title="Sequence Diagram" mermaidCode={SEQ_DIAGRAM_CODE} onPointerUp={onPointerUp} />
      <MermaidCard title="Class Diagram" mermaidCode={CLASS_DIAGRAM_CODE} onPointerUp={onPointerUp} />
      <MermaidCard title="State Diagram" mermaidCode={STATE_DIAGRAM_CODE} onPointerUp={onPointerUp} />
      <MermaidCard title="Entity Relationship" mermaidCode={ER_DIAGRAM_CODE} onPointerUp={onPointerUp} />
      <MermaidCard title="User Journey" mermaidCode={USER_JOURNEY_CODE} onPointerUp={onPointerUp} />
      <MermaidCard title="Gantt Chart" mermaidCode={GANTT_CHART_CODE} onPointerUp={onPointerUp} />
      <MermaidCard title="Pie Chart" mermaidCode={PIE_CHART_CODE} onPointerUp={onPointerUp} />
    </div>
  )
}
