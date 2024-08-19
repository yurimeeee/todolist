import React, { useState } from 'react';
import { Table, TableColumnsType, MenuProps, Dropdown, Space } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { statusFormatter } from '@utils/functions';
import CustomDropdown from './CustomDropdown';
import { Todo } from 'src/types/type';

interface ListTableProps {
  data?: Todo[];
  // onClick: () => void;
}

interface DataType {
  key: React.Key;
  title: string;
  startDate: Dayjs;
  endDate: Dayjs;
  compDate: Dayjs;
  // status: string;
  status: 'before' | 'progress' | 'complete' | 'stop' | 'cancel';
}

// const columns: TableColumnsType<DataType> = [
const columns: TableColumnsType<DataType> = [
  {
    title: '할일',
    dataIndex: 'title',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '시작일',
    dataIndex: 'startDate',
    align: 'center',
    render: (date: Dayjs) => (date ? date.format('YYYY-MM-DD') : '-'),
    sorter: (a, b) => a.startDate.unix() - b.startDate.unix(),
  },
  {
    title: '목표일',
    dataIndex: 'endDate',
    align: 'center',
    render: (date: Dayjs) => (date ? date.format('YYYY-MM-DD') : '-'),
    sorter: (a, b) => a.endDate.unix() - b.endDate.unix(),
  },
  {
    title: '완료일',
    dataIndex: 'compDate',
    align: 'center',
    render: (date: Dayjs) => (date ? date.format('YYYY-MM-DD') : '-'),
    sorter: (a, b) => a.compDate.unix() - b.compDate.unix(),
  },
  {
    title: '상태',
    dataIndex: 'status',
    align: 'center',
    filters: [
      {
        text: '진행예정',
        value: 'before',
      },
      {
        text: '진행중',
        value: 'progress',
      },
      {
        text: '완료',
        value: 'complete',
      },
      {
        text: '일시정지',
        value: 'stop',
      },
      {
        text: '보류',
        value: 'cancel',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    render: (status: string) => statusFormatter(status),
  },
  {
    title: '관리',
    key: 'operation',
    align: 'center',
    fixed: 'right',
    width: 52,
    render: () => <CustomDropdown todoId="dfdsfd" />,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.title === 'Disabled User', // Column configuration not to be checked
    title: record.title,
  }),
};
const ListTable = ({ data }: ListTableProps) => {
  // Todo 타입을 DataType으로 변환하는 함수
  const convertTodosToDataType = (todos: Todo[]): any[] => {
    return todos?.map((todo) => ({
      key: todo.id,
      title: todo.title,
      // startDate: dayjs(todo.period[0]),
      startDate: todo.period && todo.period[0] ? dayjs(todo.period[0]) : null,
      // endDate: dayjs(todo.period[1]),
      endDate: todo.period && todo.period[1] ? dayjs(todo.period[1]) : null,
      // compDate: dayjs(todo.compDate) || '-',
      compDate: todo.compDate ? dayjs(todo.compDate) : null,
      status: todo.status,
    }));
  };

  return (
    <div>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data ? convertTodosToDataType(data) : undefined}
        size="middle"
      />
    </div>
  );
};

export default ListTable;
