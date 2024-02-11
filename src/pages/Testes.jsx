import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids';
import { CustomGrid2 } from '../data/dummy';
import Header from '../components/Header';
import { ChartsHeader } from '../components/Charts';

import {useStateContext } from '../ContextProvider';

const Testes = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { currentMode } = useStateContext();

  useEffect(() => {
    // Chama a API do Django quando o componente é montado
    
    axios
      .get('http://127.0.0.1:8000/produtos/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter dados da API:', error);
      });
  }, []);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchButtonClick = () => {
    axios
    .get('http://127.0.0.1:8000/save_product/', {
      params: {
        url: searchText
      }
    })
    .then((response) => {
      alert(response.data.message);
    })
    .catch((error) => {
      console.error('Erro ao salvar produto:', error);
    });
  };


  return (

    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Testes" />
      <div className="mt-24 p-10 bg-white rounded-3xl text-xl mb-2 mt-3">
      {/* Adicionando a caixa de texto e o botão acima da div */}
      <div className="mb-4">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Digite para pesquisar..."
        />
        <button onClick={handleSearchButtonClick}>Pesquisar</button>
      </div>
      </div>
      <ChartsHeader category="Lista"/>
      <GridComponent
        dataSource={data}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
        // Inclua o SearchSettings para habilitar a funcionalidade de pesquisa
        searchSettings={{ fields: ['Name'] }}
        
        
      >
        <ColumnsDirective>
          {CustomGrid2.map((item, index) => (
            <ColumnDirective
              key={item.field}
              {...item}
              field={item.field}
              headerText={item.headerText}
              width={item.width}
              
            />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Page, Toolbar, Selection, Edit, Sort, Filter]}
        />
      </GridComponent>
      </div>
  );
};
export default Testes;