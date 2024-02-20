import React from 'react'

import { KanbanComponent, ColumnsDirective,
ColumnDirective } from '@syncfusion/ej2-react-kanban';

import { kanbanData, kanbanGrid } from '../data/dummy';
import Header from '../components/Header';

const Kanban = () => {
  return (
    <div className='chart-layout dark:bg-secondary-dark-bg'>
      <Header category='Kanban' />
      <KanbanComponent
        id='kanban'
        dataSource={kanbanData}
        cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
        keyField='Status'
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => 
          <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
      </KanbanComponent>

    </div>
  )
}

export default Kanban