import { IJsonModel } from 'flexlayout-react'
import { nanoid } from 'nanoid'
import { TabNodeType } from '../consts'

export function getInitialLayout(): IJsonModel {
  return {
    global: {
      tabEnableRename: false,
    },
    borders: [
      {
        type: 'border',
        selected: -1,
        location: 'left',
        children: [
          {
            type: 'tab',
            name: 'Diagrams',
            component: TabNodeType.diagrams,
            enableClose: false,
            borderWidth: 400,
            enableRenderOnDemand: true,
          },
        ],
      },
    ],
    layout: {
      type: 'row',
      children: [
        {
          type: 'tabset',
          weight: 50,
          enableDrop: false,
          enableDrag: false,
          id: 'main-tabs',
          children: [
            {
              type: 'tab',
              name: 'Untitled',
              component: TabNodeType.mermaidContainer,
              config: {
                editorId: nanoid(),
              },
            },
          ],
          active: true,
        },
      ],
    },
  }
}
