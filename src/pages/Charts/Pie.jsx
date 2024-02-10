import React from 'react';

import { pieChartData } from '../../data/dummy';
import { ChartsHeader, Pie as PieChart } from '../../components/Charts';

const Pie = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Pie" title="PRODUTO / LOJA" />
    <div className="w-full">
      <PieChart id="chart-pie" legendVisiblity height="full" />
    </div>
  </div>
);

export default Pie;