import {  Space, Table, Tag } from 'antd';
import React from 'react'

function MyTable({columns,data,}) {
    console.log(data);
    

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default MyTable
