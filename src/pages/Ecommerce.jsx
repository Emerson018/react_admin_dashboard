import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { Stacked, Button, SparkLine } from '../components/Charts';
import { SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../ContextProvider';

import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';

import axios from 'axios';

const Ecommerce = () => {
  const { currentColor } = useStateContext();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);

  const [earningDataWithBackend, setEarningDataWithBackend] = useState([]);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      const totalEarnings = response.data.reduce((acc, curr) => acc + curr.rendimento_mensal, 0);
      const totalLosses = response.data.reduce((acc, curr) => acc + curr.menor_venda, 0);
      return { totalEarnings, totalLosses };
    } catch (error) {
      console.error('Erro ao obter dados do backend:', error);
      return { totalEarnings: 0, totalLosses: 0 };
    }
  };

  const createData = (icon, amount, losses, title, iconColor, iconBg, pcColor) => ({
    icon,
    amount,
    losses,
    percentage: (losses / amount * 100).toFixed(2) + '%',
    title,
    iconColor,
    iconBg,
    pcColor,
  });

  useEffect(() => {
    const fetchDataForAllStores = async () => {
      const response1 = await fetchData('http://127.0.0.1:8000/loja1/');
      const response2 = await fetchData('http://127.0.0.1:8000/loja2/');
      const response3 = await fetchData('http://127.0.0.1:8000/loja3/');

      const loja1Data = createData(
        <MdOutlineSupervisorAccount />,
        response1.totalEarnings,
        response1.totalLosses,
        'Loja 1',
        '#03C9D7',
        '#E5FAFB',
        'red-600'
      );

      const loja2Data = createData(
        <BsBoxSeam />,
        response2.totalEarnings,
        response2.totalLosses,
        'Loja 2',
        'rgb(255, 244, 229)',
        'rgb(254, 201, 15)',
        'red-600'
      );

      const loja3Data = createData(
        <FiBarChart />,
        response3.totalEarnings,
        response3.totalLosses,
        'Loja 3',
        'rgb(228, 106, 118)',
        'rgb(255, 244, 229)',
        'red-600'
      );

      const combinedData = [loja1Data, loja2Data, loja3Data];
      setTotalEarnings(response1.totalEarnings + response2.totalEarnings + response3.totalEarnings);
      setTotalLosses(response1.totalLosses + response2.totalLosses + response3.totalLosses);
      setEarningDataWithBackend(combinedData);
    };

    fetchDataForAllStores();
  }, []);

  return (
    <div className='mt-12'>
      <div className='chart-ecommerce-layout'>
        <div className='body-budget-card dark:bg-secondary-dark-bg'>
          <div className='chart-ecommerce-layout'>
            <div>
              <p className='budget-element'>Rendimento Total</p>
              <p className='total-budget'>R$ {totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className='ecommerce-button'>
            <Button
              color='white'
              bgColor={currentColor}
              text='Download'
              borderRadius='10px'
              size='md'
            />
          </div>
        </div>

        <div className='store-elements'>
        {earningDataWithBackend.map((item) => (
            <div
              key={item.title}
              className='store-layout dark:text-gray-200 dark:bg-secondary-dark-bg'
            >
              <button 
                type='button'
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className='button-store-elements'
              >
              </button>
              <p className='store-scale'>
                <span className='text-store-layout'>R$ 
                  {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`percent-txt text-${item.pcColor}`}>
                  {item.percentage}
                </span>
              </p>
              <p className='text-store-secondary'>
                {item.title}
                </p>
                <p className='text-store-secondary'>
              Baixas: R$ {item.losses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            </div>
          ))}
        </div>
      </div>

      <div className='container-revenue'>
        <div className='container-revenue-layout dark:text-gray-200 dark:bg-secondary-dark-bg'>
          <div className='container-revenue-top-left'>
            <p className='container-revenue-title'>Atualizações da receita</p>
              <div className='container-revenue-text'>
                <p className='container-revenue-text
                  text-gray-600
                  hover:drop-shadow-x1'>
                  <span><GoDotFill  /></span>
                  <span>Expense</span>
                </p>
                <p className='container-revenue-text
                container-revenue-text-budget'>
                  <span><GoDotFill  /></span>
                  <span>Gráfico</span>
                </p>
              </div>
          </div>
          <div className='container-stacked-graph'>
            <div className='container-stacked-layout'>
              <div>
                <p>
                  <span className='container-customers'>${'asasd'}</span>
                  <span className='container-float-value'>23%</span>
                </p>
                <p className='text-gray-500'>Clientes Totais</p>
              </div>
              <div  className='mt-8'>
                <p>
                  <span className='text-3xl font-semibold'>${}</span>
                </p>
                <p className='text-gray-500'>Expense</p>
              </div>

              <div className='mt-5'>
                <SparkLine
                  curremtColor={currentColor}
                  id='line-sparkline'
                  type='line'
                  height='80px'
                  width='250px'
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className='mt-10'>
                <Button
                  color='white'
                  bgColor={currentColor}
                  text='Download'
                  borderRadius='10px'
                />

              </div>
            </div>
            <div>
              <Stacked 
                width="320px"
                height="360px" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
