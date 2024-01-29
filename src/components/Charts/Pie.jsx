import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../../ContextProvider';

const Doughnut = ({ id, legendVisiblity, height }) => {
  const { currentMode } = useStateContext();

  const [pieData, setPieData] = useState([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');

        setPieData(response.data);

        

        console.log('Dados do banco de dados:', response.data);
      } catch (error) {
        console.error('Erro ao obter os dados: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {pieData.length && (
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisiblity, background: 'white' }}
      height={height}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name='Loja 1'
          dataSource={pieData}
          xName="tipo_produto"
          yName="qtd_produtos"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
    )}
    </>
  );
};

export default Doughnut;