import React, {useEffect, useState} from 'react'
import axios from 'axios';


import { GridComponent, ColumnsDirective,
ColumnDirective, Page, Selection, Inject,
Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import Header from '../components/Header';

const Testes = () => {
  const [data, setData] = useState([]);
      useEffect(() => {
        // Chama a API do Django quando o componente é montado
        axios.get('http://127.0.0.1:8000/produtos/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Erro ao obter dados da API:', error);
            });
    }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Testes" />
      <GridComponent
        dataSource={data}
        allowPaging
        allowSorting
        toolbar={['DELETAR']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
        // Inclua o SearchSettings para habilitar a funcionalidade de pesquisa
        searchSettings={{ fields: ['Name'] }}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => 
          <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar,
          Selection, Edit, Sort, Filter]} />
      </GridComponent>

      <div>
            {/* Se você quiser exibir os dados na interface, pode fazer algo como: */}
            {data.map(item => (
                <div key={item.lm.titulo}>
                    {/* Exibir os dados aqui, ajuste conforme a estrutura do seu modelo */}
                    <p>Título: {item.titulo}</p>
                    <p>Preço: {item.preco}</p>
                    <p>Link: {item.link}</p>
                    <p>Avaliações: {item.avaliacoes}</p>
                    <p>Média de Avaliações: {item.media_avaliacoes}</p>
                    <p>Data do Produto: {item.data_produto}</p>
                    <p>Usuário: {item.usuario}</p>
                    {/* ... Outros campos */}
                </div>
            ))}
        </div>
      
    </div>
    
  )
}

export default Testes;