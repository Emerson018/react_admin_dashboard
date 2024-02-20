import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page,
  Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';

import Pages from '../components/Pages';

const Employees = () => {
  return (
    <div className="chart-layout dark:bg-secondary-dark-bg">
      <Pages category="Employees" />
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
