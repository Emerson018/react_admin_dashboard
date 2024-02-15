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
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>Rendimento Total</p>
              <p className='text-2xl'>R${totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className='mt-6'>
            <Button
              color='white'
              bgColor={currentColor}
              text='Download'
              borderRadius='10px'
              size='md'
            />
          </div>
        </div>

        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
        {earningDataWithBackend.map((item) => (
            <div
              key={item.title}
              className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'
            >
              <button 
                type='button'
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-x1'
              >
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                {item.title}
                </p>
                <p className='text-sm text-gray-400 mt-1'>
              Prejuízos Mensais: {item.losses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-10 flex-wrap 
      justify-center'>
        <div className='bg-white
        dark:text-gray-200
        dark:bg-secondary-dark-bg m-3 p-4
        rounded-2x1 md:w-780 rounded-2xl w-full'>
          <div className='flex justify-between'>
            <p className='font-semibold
            text-x1'>Atualizações da receita</p>
              <div className='flex items-center gap-4'>
                <p className='flex items-center gap-2
                  text-gray-600
                  hover:drop-shadow-x1'>
                  <span><GoDotFill  /></span>
                  <span>Expense</span>
                </p>
                <p className='flex items-center gap-2
                text-green-400
                hover:drop-shadow-x1'>
                  <span><GoDotFill  /></span>
                  <span>Budget</span>
                </p>
              </div>
          </div>
          <div className='mt-10 flex gap 
          flex-wrap justify-center'>
            <div className='border-r-1
            border-color m-4 pr-10'>
              <div>
                <p>
                  <span className='text-3xl font-semibold'>${'asasd'}</span>
                  <span className='p-1.5 
                  hover:drop-shadow-x1
                  cursor-pointer
                  rounded-full text-white
                  bg-green-400 ml-3 text-xs'>23%</span>
                </p>
                <p className='text-gray-500'>Budget</p>
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
