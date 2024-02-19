import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components/Charts';
import { useStateContext } from '../../ContextProvider';

const Bar = () => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState([]);
  const palette = ['#E94649', '#F6B53F', '#6FAAB0', '#FF33F3', '#228B22', '#3399FF'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = ['http://127.0.0.1:8000/loja1/', 'http://127.0.0.1:8000/loja2/', 'http://127.0.0.1:8000/loja3/'];
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const sortedData = responses.map(response => response.data);
        setBarData(sortedData);
        console.log('Dados do banco de dados:', sortedData);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };

    fetchData();  
  }, []);

  const isDataReady = barData.every(data => data.length > 0);

  return (
    <>
      {isDataReady && (
        <div className={`chart-layout ${currentMode === 'Dark' ? 'dark:bg-secondary-dark-bg' : ''}`}>
          <ChartsHeader category="Bar" title="Contagem de Medalhas Olímpicas - RIO" />
          <div className="w-full">
            <ChartComponent
              id="charts"
              primaryXAxis={barPrimaryXAxis}
              primaryYAxis={barPrimaryYAxis}
              chartArea={{ border: { width: 0 } }}
              tooltip={{ enable: true }}
              background={currentMode === 'Dark' ? '#33373E' : '#fff'}
              palettes={palette}
              legendSettings={{ background: currentMode === 'Dark' ? '#33373E' : '#fff', textStyle: { color: currentMode === 'Dark' ? '#fff' : '#333' } }}
            >
              <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
              <SeriesCollectionDirective>
                {barData.map((data, index) => (
                  <SeriesDirective
                    key={index}
                    dataSource={data}
                    xName='tipo_produto'
                    yName="qtd_produtos"
                    type="Column"
                    name={`Loja ${index + 1}`}
                  />
                ))}
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      )}
    </>
  );
};

export default Bar;
