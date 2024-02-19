import React from 'react';

import { ChartsHeader, Pie as PieChart } from '../../components/Charts';

const Pie = () => (
  <div className="chart-layout dark:bg-secondary-dark-bg">
    <ChartsHeader category="Pie" title="PRODUTO / LOJA" />
    <div className="w-full">
      <PieChart id="chart-pie" legendVisiblity height="full" />
    </div>
  </div>
);

export default Pie;