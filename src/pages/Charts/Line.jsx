import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {ChartsHeader, LineChart} from '../../components/Charts';

const Line = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Função para buscar os dados do banco de dados
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/produtos/');
        // Substitua 'sua-api-endpoint-aqui' pelo endpoint correto da sua API
        setChartData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
      }
    };

    // Chame a função para buscar os dados
    fetchData();
  }, []);

  return (
    <div className="chart-layout dark:bg-secondary-dark-bg">
      <ChartsHeader category="Line" title="inflation Rate" />
      <div className="w-full">
        <LineChart data={chartData} />
      </div>
    </div>
  );
};

export default Line;

