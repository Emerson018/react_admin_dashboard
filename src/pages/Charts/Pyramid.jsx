import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../ContextProvider';
import { ChartsHeader } from '../../components/Charts';

const Pyramid = () => {
  const { currentMode } = useStateContext();
  const [pyramidData, setPyramidData] = useState([]);

  useEffect(() => {
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
    <>
      {pyramidData.length > 0 && (
        <div className={`chart-layout ${currentMode === 'Dark' ? 'dark:bg-secondary-dark-bg' : ''}`}>
          <ChartsHeader category="Pyramid" title="Tipos de produtos da Loja 1" />
          <div className="w-full">
            <AccumulationChartComponent
              id="pyramid-chart"
              legendSettings={{
                background: currentMode === 'Dark' ? '#33373E' : '#fff',
                textStyle: { color: currentMode === 'Dark' ? '#fff' : '#333' }
              }}
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
      )}
    </>
  );
};

export default Pyramid;
