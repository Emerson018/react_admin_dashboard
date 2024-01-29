import React, { useEffect, useState } from 'react';
import axios from 'axios';


import { ChartComponent, SeriesCollectionDirective,
SeriesDirective, Inject, Legend, Category, StackingColumnSeries,
Tooltip } from '@syncfusion/ej2-react-charts';

import { stackedCustomSeries, stackedPrimaryXAxis,
stackedPrimaryYAxis } from '../../data/dummy';

const Stacked = ({width, height}) => {

  const [stackedData, setStackedData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');
   
        setStackedData(response.data);
     
        console.log('Dados do banco de dados:', response.data);
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
          primaryXAxis={stackedPrimaryXAxis}
          primaryYAxis={stackedPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
        >
          <Inject services={[StackingColumnSeries, Legend, Tooltip, Category]} />
          <SeriesCollectionDirective>
            {stackedCustomSeries.map((series, index) => {
              return (
                <SeriesDirective
                  key={index}
                  dataSource={stackedData}
                  xName='clientes_total'
                  yName='clientes_cnpj'
                  name={series.name}
                  type={series.type}
                  marker={series.marker}
                  width={2}
                  animation={{ enable: true }}
                />
              )
            })}
          </SeriesCollectionDirective>

        </ChartComponent>
      )}
    </>
    );
  }

export default Stacked