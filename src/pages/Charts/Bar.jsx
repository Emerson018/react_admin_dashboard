import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';
import axios from 'axios';
import { barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components/Charts';
import { useStateContext } from '../../ContextProvider';
const Bar = () => {
  const { currentMode } = useStateContext();
  const [barData, setBarData] = useState([]);
  const [barData2, setBar2Data] = useState([]);
  const [barData3, setBar3Data] = useState([]);
  const palette = ['#ca3542', '#27647b', '#849fad', '#aec0c9', '#57575f', '#37afa9'];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');
        const response2 = await axios.get('http://127.0.0.1:8000/loja2/');
        const response3 = await axios.get('http://127.0.0.1:8000/loja3/');
        setBarData(response.data);
        setBar2Data(response2.data);
        setBar3Data(response3.data);
        console.log('Dados do banco de dados:', response.data);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };
    fetchData();  
  }, []);
  const isDataReady = barData.length > 0 && barData2.length > 0 && barData3.length > 0;
  return (
    <>
      {isDataReady && (
    <div className="chart-layout dark:bg-secondary-dark-bg">
      <ChartsHeader category="Bar" title="Contagem de Medalhas Olímpicas - RIO" />
      <div className=" w-full">
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
            {/* Utilize o seriesData em vez do barCustomSeries estático */}
            <SeriesDirective dataSource={barData} xName='tipo_produto' yName="qtd_produtos" type="Column" name='Loja 1' />
            <SeriesDirective dataSource={barData2} xName='tipo_produto' yName="qtd_produtos" type="Column" name='Loja 2' />
            <SeriesDirective dataSource={barData3} xName='tipo_produto' yName="qtd_produtos" type="Column" name='Loja 3' />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
    )}
    </>
  );
};
export default Bar;