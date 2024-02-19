import React from 'react'

import { GridComponent, ColumnsDirective,
ColumnDirective, Page, Selection, Inject,
Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import Header from '../components/Header';

const Customers = () => {
  return (
    <div className="chart-layout dark:bg-secondary-dark-bg">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
        // Inclua o SearchSettings para habilitar a funcionalidade de pesquisa
        searchSettings={{ fields: ['Name'] }}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => 
          <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar,
          Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  )
}

export default Customers;
