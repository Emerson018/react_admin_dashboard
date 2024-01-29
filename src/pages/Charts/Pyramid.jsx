import React, { useEffect, useState } from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection } from '@syncfusion/ej2-react-charts';
import axios from 'axios';

import { useStateContext } from '../../ContextProvider';
import { ChartsHeader } from '../../components/Charts';

const Pyramid = () => {
  const { currentMode } = useStateContext();

  const [pyramidData, setPyramidData] = useState([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');

        const sortedData = response.data.sort((a, b) => a.rendimento_mensal - b.rendimento_mensal);
        setPyramidData(sortedData);

        console.log('Dados do banco de dados:', sortedData);
      } catch (error) {
        console.error('Erro ao obter os dados: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-4 md:m-10 mt-24  p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Pyramid" title="Food Comparison Chart" />
      <div className="w-full">
        <AccumulationChartComponent
          id="pyramid-chart"
          legendSettings={{ background: 'white' }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
        >
          <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationLegend, AccumulationSelection]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              name="Loja 1"
              dataSource={pyramidData}
              xName="tipo_produto"
              yName="rendimento_mensal"
              type="Pyramid"
              width="45%"
              height="80%"
              neckWidth="15%"
              gapRatio={0.03}
              explode
              emptyPointSettings={{ mode: 'Drop', fill: 'red' }}
              dataLabel={{
                visible: true,
                position: 'Inside',
                name: 'text',
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default Pyramid;