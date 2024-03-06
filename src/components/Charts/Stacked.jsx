import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis, paletteColors } from '../../data/dummy';
import { useStateContext } from '../../ContextProvider';

const Stacked = ({ width, height }) => {
  const [stackedData, setStackedData] = useState([]);
  const { currentMode } = useStateContext();
  const [somaDados, SetSomaDados] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');
        const response2 = await axios.get('http://127.0.0.1:8000/soma-clientes/');

        setStackedData(response.data);
        SetSomaDados(response2.data);
        console.log('Banco de dados:', response.data);
        console.log('Dados do backend:', response2.data);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {stackedData.length > 0 && (
        <ChartComponent
          width={width}
          height={height}
          id='charts'
          palettes={paletteColors}
          primaryXAxis={stackedPrimaryXAxis}
          primaryYAxis={stackedPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, format: '${series.name}: ${point.y}' }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{
            background: currentMode === 'Dark' ? '#33373E' : '#fff',
            textStyle: { color: currentMode === 'Dark' ? '#fff' : '#333' }
          }}
          

        >
          <Inject services={[StackingColumnSeries, Legend, Tooltip, Category]} />
          <SeriesCollectionDirective>
            {stackedCustomSeries.map((series, index) => (
              <SeriesDirective
                key={index}
                dataSource={stackedData}
                xName='clientes_total'
                yName={series.name === 'CPF' ? 'clientes_cpf' : 'clientes_cnpj'}
                name={series.name}
                type={series.type}
                marker={series.marker}
                width={2}
                animation={{ enable: true }}
                
              />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      )}
    </>
  );
};

export default Stacked;
