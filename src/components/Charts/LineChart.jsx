import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy'; // Importe as configurações do eixo principal, se necessário
import { useStateContext } from '../../ContextProvider';
const LineChart = () => {
  const { currentMode } = useStateContext();
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');
        const response2 = await axios.get('http://127.0.0.1:8000/loja2/');
        const response3 = await axios.get('http://127.0.0.1:8000/loja3/');
        const palette = ['#ca3542', '#27647b', '#849fad', '#aec0c9', '#57575f', '#37afa9'];

        const sortByDate = (data) => {
          return data.sort((a, b) => new Date(a.data) - new Date(b.data))
        };

        setChartData(sortByDate(response.data));
        setChartData2(sortByDate(response2.data));
        setChartData3(sortByDate(response3.data));
        console.log('Dados do banco de dados:', response.data);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };
    fetchData();  
  }, []);
  const isDataReady = chartData.length > 0 && chartData2.length > 0 && chartData3.length > 0;
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
      legendSettings={{ background: currentMode === 'Dark' ? '#33373E' : '#fff', textStyle: { color: currentMode === 'Dark' ? '#fff' : '#333' } }}

    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={chartData} xName='data' yName="porc_variacao_anual" type="Line" name='Loja 1' />
        <SeriesDirective dataSource={chartData2} xName='data' yName="porc_variacao_anual" type="Line" name='Loja 2' />
        <SeriesDirective dataSource={chartData3} xName='data' yName="porc_variacao_anual" type="Line" name='Loja 3'  />
      </SeriesCollectionDirective>
    </ChartComponent>
    )}
    </>
  );
};
export default LineChart;