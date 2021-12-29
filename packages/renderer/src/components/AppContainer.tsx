import React, { useCallback, useEffect, useRef } from 'react'
import { Layout, TabNode, Model, Action } from 'flexlayout-react'
import { nanoid } from 'nanoid'
import { IpcChannelLabel, MenuItemType } from '../../../common/consts'
import { IMenuArgs } from '../../../common/interfaces'
import { TabNodeType } from '../consts'
import { getInitialLayout } from '../lib/flexlayout'
import { useAppDispatch } from '../redux/hooks'
import { setActiveEditor } from '../redux/reducers/editors.reducer'
import { MermaidContainer } from './mermaid/MermaidContainer'
import { DiagramsSidebar } from './DiagramsSidebar'

function initMenuHandler(layoutRef?: Layout | null) {
  if (layoutRef) {
    window.ipc.receive(IpcChannelLabel.Menu, (data: IMenuArgs) => {
      switch (data.itemType) {
        case MenuItemType.NewFile:
          layoutRef.addTabToTabSet('main-tabs', {
            type: 'tab',
            component: TabNodeType.mermaidContainer,
            name: 'Untitled',
            config: {
              editorId: nanoid(),
            },
          })
      }
    })
  }
}

const AppContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const flexLayoutModel = useRef<Model>(Model.fromJson(getInitialLayout()))
  const layoutRef = useRef<Layout>(null)

  useEffect(() => {
    initMenuHandler(layoutRef.current)
  }, [layoutRef.current])

  const layoutFactory = useCallback((node: TabNode) => {
    const component = node.getComponent()

    switch (component) {
      case TabNodeType.mermaidContainer:
        return <MermaidContainer editorId={node.getConfig().editorId} />
      case TabNodeType.diagrams:
        return <DiagramsSidebar />
    }
  }, [])

  const onAction = useCallback((action: Action) => {
    switch (action.type) {
      case 'FlexLayout_SelectTab': {
        const node = flexLayoutModel.current.getNodeById(action.data.tabNode) as TabNode

        if (node.getComponent() === 'mermaidContainer') {
          dispatch(setActiveEditor({ editorId: node.getConfig().editorId }))
        }

        break
      }
    }

    return action
  }, [])

  const classMapper = useCallback((className) => {
    switch (className) {
      case 'flexlayout__tab_button_top':
        return 'tab-button-top'
      case 'flexlayout__tabset-selected':
        return 'tabset-selected'
    }

    return className
  }, [])

  return (
    <Layout
      ref={layoutRef}
      model={flexLayoutModel.current}
      factory={layoutFactory}
      classNameMapper={classMapper}
      onAction={onAction}
    />
  )
}

export default AppContainer
