import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy'; // Importe as configurações do eixo principal, se necessário
import { useStateContext } from '../../ContextProvider';

const LineChart = () => {
  const { currentMode } = useStateContext();
  const [chartData, setChartData] = useState([]);
  const palette = ['#E94649', '#F6B53F', '#6FAAB0', '#FF33F3', '#228B22', '#3399FF'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = ['http://127.0.0.1:8000/loja1/', 'http://127.0.0.1:8000/loja2/', 'http://127.0.0.1:8000/loja3/'];
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const sortedData = responses.map(response => response.data.sort((a, b) => new Date(a.data) - new Date(b.data)));
        setChartData(sortedData);
        
        console.log('Dados do banco de dados:', sortedData);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };

    fetchData();  
  }, []);

  const isDataReady = chartData.every(data => data.length > 0);

  return (
    <>
      {isDataReady && (
        <ChartComponent
          id="line-chart"
          height="420px"
          primaryXAxis={LinePrimaryXAxis} // Adapte conforme necessário
          primaryYAxis={LinePrimaryYAxis} // Adapte conforme necessário
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          palettes={palette}
          legendSettings={{ background: currentMode === 'Dark' ? '#33373E' : '#fff', textStyle: { color: currentMode === 'Dark' ? '#fff' : '#333' } }}
        >
          <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {chartData.map((data, index) => (
              <SeriesDirective
                key={index}
                dataSource={data}
                xName='data'
                yName="porc_variacao_anual"
                type="Line"
                name={`Loja ${index + 1}`}
                marker={{visible: true}}
              />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      )}
    </>
  );
};

export default LineChart;
