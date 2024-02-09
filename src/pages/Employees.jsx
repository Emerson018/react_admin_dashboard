import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page,
  Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';

import Header from '../components/Header';

const Employees = () => {
  return (
    <div className="bg-white
    dark:text-gray-200
    dark:bg-secondary-dark-bg m-3 p-4
     rounded-2xl w-full">
      <Header category="Página" title="Funcionários" />
      <GridComponent
        dataSource={employeesData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
        // Inclua o SearchSettings para habilitar a funcionalidade de pesquisa
        searchSettings={{ fields: ['Name'] }}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => 
          <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
