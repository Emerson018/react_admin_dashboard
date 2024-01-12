import React from 'react'

import { GridComponent, ColumnsDirective,
ColumnDirective, Page, Selection, Inject,
Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import Header from '../components/Header';

const Testes = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Testes" />
      <GridComponent
        dataSource={customersData}
        allowPaging
        allowSorting
        toolbar={['DELETAR']}
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

export default Testes;