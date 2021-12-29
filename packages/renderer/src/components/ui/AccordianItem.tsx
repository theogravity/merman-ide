import * as Accordion from '@radix-ui/react-accordion'
import React from 'react'

interface AccordianItemProps {
  headerLabel: string
  children?: React.ReactNode
}

export const AccordianItem: React.FC<AccordianItemProps> = ({ headerLabel, children }) => {
  return (
    <Accordion.Item value={headerLabel} className="p-2 bg-gray-800">
      <Accordion.Header>
        <Accordion.Trigger>
          <span className="text-base font-medium text-white">{headerLabel}</span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-gray-400 mt-2">{children}</Accordion.Content>
    </Accordion.Item>
  )
}
