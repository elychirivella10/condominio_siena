import { useState, useEffect, useRef } from 'react'

//componentes
import Panel from "components/panel/Panel";
import Export from 'components/excel/Export'

//librerias
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Badge} from 'antd';
import Highlighter from 'react-highlight-words';
import TableComp from "components/tabla/Tabla";
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

//peticiones Ajax y configuraciones
import { creates } from "lib/peticiones/funcionariosList";
import { getRole, getUser } from 'helpers/auth/auth';


 const Funcionarios = ()=> {

  //estado para controlar el loader de la pagina
  const [spinning, setSpinning] = useState(false);

  //data que va para las tablas
  const [data, setData] = useState([])

  //data filtrada para las tablas
  const [dataFiltrada, setDataFiltrada] = useState([])

  // estado para los valores de los filtros de las tablas
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  //referencia para seleccionar las busquedas y los filtros
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  //funcion que muestra el input para poder mostrar el filtro
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    sync()
  }, [])


  //funcion que controla la peticion de la informacion de la tabla
  const sync = async () =>{
      const valores = creates(getRole(), getUser())

      //se inicia mostrando el loader ya una vez cumplida la promesa de manera exitosa se procede a desactivar el loader
      setSpinning(true)
      Promise.all([valores]).then((values) => {
        setData(values[0])
        setSpinning(false)
      });

  }


  //defiicion de las columnas de la tabla
  const Columns = [
    {
      width:28,
      render: (text, record) => <Badge color={'#5068B5'}/>,
    },
    {
      title:'Descripción Recibo',
      dataIndex:'descripcion',
      ellipsis: true,
      ...getColumnSearchProps('descripcion'),
      //renderizado personalizado para la tabla, se agrego un link para ir directamente a la informacion seleecionada
      render: (text, record) => <Link to={''+record.gasto_id+'/'+record.id}>{text}</Link>,
     /* filters: 
        estados.map(es=>(
          {
            text: es.estado,
            value: es.estado,
          }
        )),

      onFilter: (value, record) => record.estado.indexOf(value) === 0,*/
    },
    {
      title:'Nro Recibo',
      dataIndex:'id',
      ...getColumnSearchProps('id'),
      //renderizado personalizado para la tabla, se agrego un link para ir directamente a la informacion seleecionada
      render: (text, record) => <Link to={''+record.gasto_id+'/'+record.id}>{'Nro. '+text}</Link>,
    },
    {
      title:'Estatus',
      dataIndex:'estado',
      ...getColumnSearchProps('estado'),
      //renderizado personalizado para la tabla, se agrego un link para ir directamente a la informacion seleecionada
      render: (text, record) => <Link to={''+record.gasto_id+'/'+record.id}>{text=='por_pagar'?'Por Pagar': 'Pagado'}</Link>,
    },

  ];

  return (
    <div className="columns is-multiline is-centered is-vcentered">
      <div className="column is-12">
        <Spin spinning={spinning} indicator={<LoadingOutlined spin />}  size="large" fullscreen />
        <Panel title='Lista Recibos' subtitle={`Condominio Siena`}/>

        <div className="columns is-multiline">
          <div className="column is-12">
            <div className="box">
             {/*  //modulo para exportar data en excel */}
              <Export data={data} dataFiltrada ={dataFiltrada}/>
            </div>
              <TableComp  setDataFiltrada={setDataFiltrada} columns={Columns} data={data} pagination={{ defaultPageSize: 10, pageSizeOptions: ['5', '7', '10', '20', '30'] }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funcionarios
