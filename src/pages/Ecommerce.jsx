import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { Stacked, Button, SparkLine } from '../components/Charts';
import { SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../ContextProvider';

import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';

import axios from 'axios';

const Ecommerce = () => {
  const { currentColor } = useStateContext();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeficit, setTotalDeficit] = useState(0);

  const [lojaData1, setLojaData] = useState([]);
  const [lojaData2, setLojaData2] = useState([]);
  const [lojaData3, setLojaData3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('http://127.0.0.1:8000/loja1/');
        const response2 = await axios.get('http://127.0.0.1:8000/loja2/');
        const response3 = await axios.get('http://127.0.0.1:8000/loja3/');

        setLojaData(response1.data);
        setLojaData2(response2.data);
        setLojaData3(response3.data);

        const loja1Variables = response1.data.map(item => ({
          rendimento_mensal: item.rendimento_mensal,
          menor_venda: item.menor_venda
        }));
        const loja2Variables = response2.data.map(item => ({
          rendimento_mensal: item.rendimento_mensal,
          menor_venda: item.menor_venda
        }));
        const loja3Variables = response3.data.map(item => ({
          rendimento_mensal: item.rendimento_mensal,
          menor_venda: item.menor_venda
        }));

        const allVariables = [...loja1Variables, ...loja2Variables, ...loja3Variables];

        const total = allVariables.reduce((acc, curr) => acc + curr.rendimento_mensal, 0);
        setTotalEarnings(total);

        const totalDeficit = allVariables.reduce((acc, curr) => acc + curr.menor_venda, 0);
        setTotalDeficit(totalDeficit);

        // Atualize os valores de amount em earningData com os rendimentos mensais de cada loja
        const updatedEarningData = earningData.map((item, index) => {
          switch (index) {
            case 0:
              return { ...item, amount: lojaData1.map(data => data.rendimento_mensal).reduce((acc, curr) => acc + curr, 0) };
            case 1:
              return { ...item, amount: lojaData2.map(data => data.rendimento_mensal).reduce((acc, curr) => acc + curr, 0) };
            case 2:
              return { ...item, amount: lojaData3.map(data => data.rendimento_mensal).reduce((acc, curr) => acc + curr, 0) };
            default:
              return item;
          }
        });
        setEarningData(updatedEarningData);

      } catch (error) {
        console.error('Erro ao obter dados do backend:', error);
      }
    };

    fetchData();
  }, []);

  const [earningData, setEarningData] = useState([
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: '',
      percentage: '-25%',
      title: 'Loja 1',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsBoxSeam />,
      amount: '',
      percentage: '+23%',
      title: 'Loja 2',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FiBarChart />,
      amount: '',
      percentage: '+38%',
      title: 'Loja 3',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',

      pcColor: 'green-600',
    },
    {
      icon: <HiOutlineRefresh />,
      amount: '',
      percentage: '-12%',
      title: 'Perdas',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ]);


  return (
    <div className='mt-12'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>Rendimento Total</p>
              <p className='text-2xl'>${totalEarnings.toFixed(2)}</p>
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
          {earningData.map((item) => (
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
                  {item.amount}
                </span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                {item.title}</p>
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
            text-x1'>Revenue Updates</p>
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
                  <span className='text-3xl font-semibold'>${}</span>
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
                  <span className='text-3xl font-semibold'>${totalDeficit}</span>
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
