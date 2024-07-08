import { useState, useEffect, useRef } from 'react'
import Panel from "components/panel/Panel";
import Export from 'components/excel/Export'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Badge} from 'antd';
import Highlighter from 'react-highlight-words';
import TableComp from "components/tabla/Tabla";
import { Link } from 'react-router-dom';
import { creates } from "lib/peticiones/funcionariosList";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

 const Funcionarios = ()=> {
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

  const sync = async () =>{
      const valores = creates()
      setSpinning(true)
      Promise.all([valores]).then((values) => {
        setData(values[0])
        setSpinning(false)
      });

  }

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
      render: (text, record) => <Link to={''+record.gasto_id+'/'+record.id}>{'Nro. '+text}</Link>,
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
