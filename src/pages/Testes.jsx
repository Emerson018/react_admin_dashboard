import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';
import { CustomGrid2 } from '../data/dummy';
import { ChartsHeader } from '../components/Charts';
import { useStateContext } from '../ContextProvider';

const Testes = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { currentColor } = useStateContext();

  const toolbarOptions = ['Search'];
  const searchOptions = {
      fields: ['titulo', 'lm'],
      ignoreCase: true,
      operator: 'contains'
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/produtos/');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchButtonClick = () => {
    axios
      .get('http://127.0.0.1:8000/save_product/', {
        params: { url: searchText }
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('Erro ao salvar produto:', error);
      });
  };

  return (
    <div className="chart-layout dark:bg-secondary-dark-bg">
      <ChartsHeader category="Adicionar Produto" />
      <div className="search_test_box">
        <div className="mb-4">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Digite para pesquisar..."
          />
          <div className='center-button'>
            <button onClick={handleSearchButtonClick} > Salvar produto</button>
          </div>
        </div>
      </div>
      <ChartsHeader category="Produtos" />
      <GridComponent
        
        dataSource={data}
        allowPaging
        allowSorting
        toolbar={toolbarOptions}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
        searchSettings={searchOptions}
        className='layout_charts'
        bgColor={currentColor}
        
      >
        <ColumnsDirective>
      
          {CustomGrid2.map((item) => (
            <ColumnDirective
              key={item.field}
              {...item}
              
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter, Search]} />
      </GridComponent>
    </div>
  );
};

export default Testes;
