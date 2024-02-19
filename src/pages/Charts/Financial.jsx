import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend } from '@syncfusion/ej2-react-charts';

import { FinancialPrimaryXAxis, FinancialPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../ContextProvider';
import { ChartsHeader } from '../../components/Charts';

import axios from 'axios';

const mapData = (data) => ({
  data: new Date(data.data), // Ajuste conforme o formato de data retornado pelo Django
  menor_venda: data.menor_venda,
  maior_venda: data.maior_venda,
});

// eslint-disable-next-line consistent-return


const Financial = () => {
  const { currentMode } = useStateContext();

  const [financialData, setFinancialData] = useState([]);
  const [financialData2, setFinancialData2] = useState([]);
  const [financialData3, setFinancialData3] = useState([]);

  const palette = [
    '#E94649',
    '#F6B53F',
    '#6FAAB0',
    '#FF33F3',
    '#228B22',
    '#3399FF',
];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');
        const response2 = await axios.get('http://127.0.0.1:8000/loja2/');
        const response3 = await axios.get('http://127.0.0.1:8000/loja3/');
        


        // Substitua 'sua-api-endpoint-aqui' pelo endpoint correto da sua API
        setFinancialData(response.data);
        setFinancialData2(response2.data);
        setFinancialData3(response3.data);

        console.log('Dados do banco de dados:', response.data);
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
    <div className="chart-layout dark:bg-secondary-dark-bg">
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
            <SeriesDirective
              dataSource={financialData}
              xName="data"
              yName="menor_venda"
              name="loja1"
              type="Hilo"
              low="menor_venda"
              high="maior_venda"
            />
             <SeriesDirective
              dataSource={financialData2}
              xName="data"
              yName="menor_venda"
              name="loja2"
              type="Hilo"
              low="menor_venda"
              high="maior_venda"
            />
             <SeriesDirective
              dataSource={financialData3}
              xName="data"
              yName="menor_venda"
              name="loja3"
              type="Hilo"
              low="menor_venda"
              high="maior_venda"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
    )}
    </>
  );
};

export default Financial;