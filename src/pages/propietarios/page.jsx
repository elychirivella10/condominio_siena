import { useState, useEffect, useRef } from 'react'

//componentes
import Panel from "components/panel/Panel";
import Export from 'components/excel/Export'
import TableComp from "components/tabla/Tabla";

//librerias
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Badge} from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { propietarios } from "lib/peticiones/funcionariosList";
import { Spin } from 'antd';

//peticiones
import { LoadingOutlined } from '@ant-design/icons';


 const Propietarios = ()=> {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState([])
  const [dataFiltrada, setDataFiltrada] = useState([])
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
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


  //funcion que controla las peticiones inciales del componente
  const sync = async () =>{
      const valores = propietarios()
      setSpinning(true)
      Promise.all([valores]).then((values) => {
        setData(values[0])
        setSpinning(false)
      });

  }


  //definicion de columnas de la tabla de propietarios
  const Columns = [
    {
      width:28,
      render: (text, record) => <Badge color={'#5068B5'}/>,
    },
    {
      title:'Nombre',
      dataIndex:'nombre',
      ...getColumnSearchProps('nombre'),
      render: (text, record) => <Link to={''+record.cedula+'/'+record.id}>{text}</Link>,
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
      title:'Apellido',
      dataIndex:'apellido',
      ...getColumnSearchProps('apellido'),
      render: (text, record) => <Link to={''+record.cedula+'/'+record.id}>{record.nombre+' ' + record.apellido}</Link>,
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
      title:'Cedula',
      dataIndex:'cedula',
      ...getColumnSearchProps('cedula'),
      render: (text, record) => <Link to={''+record.cedula+'/'+record.id}>{text}</Link>,
    },

  ];

  return (
    <div className="columns is-multiline is-centered is-vcentered">
      <div className="column is-12">
        <Spin spinning={spinning} indicator={<LoadingOutlined spin />}  size="large" fullscreen />
        <Panel title='Lista Propietarios' subtitle={`Condominio Siena`}/>

        <div className="columns is-multiline">
          <div className="column is-12">
            <div className="box">
              <Export data={data} dataFiltrada ={dataFiltrada}/>
            </div>
              <TableComp  setDataFiltrada={setDataFiltrada} columns={Columns} data={data} pagination={{ defaultPageSize: 10, pageSizeOptions: ['5', '7', '10', '20', '30'] }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Propietarios
