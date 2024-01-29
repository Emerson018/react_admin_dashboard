import React, { useEffect, useState } from 'react';
import axios from 'axios';


import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, SplineAreaSeries, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

import { ChartsHeader } from '../../components/Charts';
import { areaPrimaryXAxis, areaPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../ContextProvider';

const Area = () => {
  const { currentMode } = useStateContext();
  
  const [areaData, setAreaData] = useState([]);
  const [areaData2, setAreaData2] = useState([]);
  const [areaData3, setAreaData3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/loja1/');
        const response2 = await axios.get('http://127.0.0.1:8000/loja2/');
        const response3 = await axios.get('http://127.0.0.1:8000/loja3/');


        // Substitua 'sua-api-endpoint-aqui' pelo endpoint correto da sua API
        setAreaData(response.data);
        setAreaData2(response2.data);
        setAreaData3(response3.data);

        console.log('Dados do banco de dados:', response.data);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };

    fetchData();  
  }, []);

  const mapeaDados = (dados) => {
    const mappedData = dados.map((item) => {
      const mappedItem = {
        x: new Date(item.data),
        y: item.porc_variacao_anual,
      };
      console.log(mappedItem); // Registra os dados mapeados
      return mappedItem;
    });
    console.log(mappedData); // Registra todo o array mapeado
    return mappedData;
  };

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Area" title="Inflation" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={mapeaDados(areaData)}
              xName="x"
              yName="y"
              name="Loja 1"
              opacity={0.5}
              type="SplineArea"
              marker={{
                visible: true,
                tooltip: true,
                tooltipTemplate: `<div>x: ${'data'}<br/>y: ${'porc_variacao_anual'}</div>`
              }}
            />
            <SeriesDirective
              dataSource={mapeaDados(areaData2)}
              xName="x"
              yName="y"
              name="Loja 2"
              opacity={0.5}
              type="SplineArea"
              marker={{ visible: true }}
            />
            <SeriesDirective
              dataSource={mapeaDados(areaData3)}
              xName="x"
              yName="y"
              name="Loja 3"
              opacity={0.5}
              type="SplineArea"
              marker={{ visible: true }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Area;