import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  SplineAreaSeries,
  Legend,
  Tooltip
} from '@syncfusion/ej2-react-charts';
import { ChartsHeader } from '../../components/Charts';
import { areaPrimaryXAxis, areaPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../ContextProvider';

const Area = () => {
  const { currentMode } = useStateContext();
  const [areaData, setAreaData] = useState([]);
  const palette = ['#ca3542', '#27647b', '#849fad', '#aec0c9', '#57575f', '#37afa9'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = ['http://127.0.0.1:8000/loja1/', 'http://127.0.0.1:8000/loja2/', 'http://127.0.0.1:8000/loja3/'];
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const [response1, response2, response3] = responses;
        setAreaData([response1.data, response2.data, response3.data]);
        console.log('Dados do banco de dados:', response1.data);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };

    fetchData();
  }, []);

  const mapeaDados = (dados) => {
    return dados.map((item) => ({
      x: new Date(item.data),
      y: item.porc_variacao_anual
    })).sort((a, b) => a.x - b.x);
  };

  const isDataReady = areaData.every(data => data.length > 0);

  return (
    <>
      {isDataReady && (
        <div className={`chart-layout ${currentMode === 'Dark' ? 'dark:bg-secondary-dark-bg' : ''}`}>
          <ChartsHeader category="Area" title="Inflation" />
          <div className="w-full">
            <ChartComponent
              id="charts"
              primaryXAxis={areaPrimaryXAxis}
              primaryYAxis={areaPrimaryYAxis}
              tooltip={{ enable: true}}   
              chartArea={{ border: { width: 0 } }}
              background={currentMode === 'Dark' ? '#33373E' : '#fff'}
              palettes={palette}
              legendSettings={{
                background: currentMode === 'Dark' ? '#33373E' : '#fff',
                textStyle: { color: currentMode === 'Dark' ? '#fff' : '#333' }
              }}
              
            >
              <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip]} />
              <SeriesCollectionDirective>
                {areaData.map((data, index) => (
                  <SeriesDirective
                    key={index}
                    dataSource={mapeaDados(data)}
                    xName="x"
                    yName="y"
                    name={`Loja ${index + 1}`}
                    opacity={0.5}
                    type="SplineArea"
                    marker={{ visible: true }}
                    
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

export default Area;
