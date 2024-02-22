import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend } from '@syncfusion/ej2-react-charts';
import { FinancialPrimaryXAxis, FinancialPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../ContextProvider';
import { ChartsHeader } from '../../components/Charts';

const Financial = () => {
  const { currentMode } = useStateContext();
  const [financialData, setFinancialData] = useState([]);
  const [financialData2, setFinancialData2] = useState([]);
  const [financialData3, setFinancialData3] = useState([]);
  const palette = ['#ca3542', '#27647b', '#849fad', '#aec0c9', '#57575f', '#37afa9'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = ['http://127.0.0.1:8000/loja1/', 'http://127.0.0.1:8000/loja2/', 'http://127.0.0.1:8000/loja3/'];
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const mappedData = responses.map(response => response.data.map(mapData));
        setFinancialData(mappedData[0]);
        setFinancialData2(mappedData[1]);
        setFinancialData3(mappedData[2]);
        console.log('Dados do banco de dados:', mappedData);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };

    fetchData();
  }, []);

  const isDataReady = financialData.length > 0 && financialData2.length > 0 && financialData3.length > 0;

  return (
    <>
      {isDataReady && (
        <div className={`chart-layout ${currentMode === 'Dark' ? 'dark:bg-secondary-dark-bg' : ''}`}>
          <ChartsHeader category="Financial" title="Financial graph" />
          <div className="w-full">
            <ChartComponent
              id="charts"
              primaryXAxis={FinancialPrimaryXAxis}
              primaryYAxis={FinancialPrimaryYAxis}
              chartArea={{ border: { width: 0 } }}
              tooltip={{ enable: true, shared: true }}
              crosshair={{ enable: true, lineType: 'Vertical', line: { width: 0 } }}
              background={currentMode === 'Dark' ? '#33373E' : '#fff'}
              palettes={palette}
              legendSettings={{ background: currentMode === 'Dark' ? '#33373E' : '#fff', textStyle: { color: currentMode === 'Dark' ? '#fff' : '#333' } }}
            >
              <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom, Legend]} />
              <SeriesCollectionDirective>
                {['loja1', 'loja2', 'loja3'].map((store, index) => (
                  <SeriesDirective
                    key={store}
                    dataSource={index === 0 ? financialData : index === 1 ? financialData2 : financialData3}
                    xName="data"
                    yName="menor_venda"
                    name={store}
                    type="Hilo"
                    low="menor_venda"
                    high="maior_venda"
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

export default Financial;

const mapData = (data) => ({
  data: new Date(data.data),
  menor_venda: data.menor_venda,
  maior_venda: data.maior_venda,
});
