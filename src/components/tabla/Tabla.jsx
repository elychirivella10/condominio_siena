import { Table } from 'antd'

const TableComp = ({columns,pagination, data, setDataFiltrada}) =>{
    
    return(
        <div className="box">
            <Table
                columns={columns}
                dataSource={data}
                size="small"
                rowKey={'id'}
                onChange={
                    (pagination, filters, sorter, extra) => {
                        setDataFiltrada(extra.currentDataSource)
                        
                    } 
               } 
                pagination={pagination}
            />
        </div>  
    )
}
export default TableComp


