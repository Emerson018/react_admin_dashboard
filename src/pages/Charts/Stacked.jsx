import React from 'react';

import { ChartsHeader, Stacked as StackedChart } from '../../components/Charts';

const Stacked = () => (
  <div className="chart-layout dark:bg-secondary-dark-bg">
    <ChartsHeader category="Stacked" title="Tipos de Clientes" />
    <div className="w-full ">
      <StackedChart />
    </div>
  </div>
);

export default Stacked;