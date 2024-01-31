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

const Testes = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

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
///////////
  const handleSearchButtonClick = () => {
    // Faça uma solicitação POST para a API do Django
    axios
      .post('http://127.0.0.1:8000/salva_produto/', newProduct)
      .then((response) => {
        // Atualize o estado de 'data' com os dados atualizados da API
        axios.get('http://127.0.0.1:8000/produtos/')
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error('Erro ao obter dados da API:', error);
          });
  
        // Limpe os campos do novo produto após adicionar ao banco de dados
        setNewProduct({
          lm: '',
          titulo: '',
          preco: 0,
          link: '',
          avaliacoes: 0,
          media_avaliacoes: 0,
          data_produto: '',
          foto: '',
          info_produto: '',
        });
      })
      .catch((error) => {
        console.error('Erro ao adicionar produto:', error);
      });
  };
  
  const [newProduct, setNewProduct] = useState({
    lm: '',
    titulo: '',
    preco: 0,
    link: '',
    avaliacoes: 0,
    media_avaliacoes: 0,
    data_produto: '',
    foto: '',
    info_produto: '',
  });



///////////
  return (
    
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    {/* daqu ipra baixo é novo */}
      <div className="mb-4">
  

  <button onClick={handleSearchButtonClick}>Add ao banco de dados</button>
</div>
{/* excluir ate aqui */}
<div className="mb-4">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Add ao banco de dados..."
        />
        <button onClick={handleSearchButtonClick}>Pesquisar</button>
      </div>
      </div>
      <Header category="Page" title="Testes" />
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