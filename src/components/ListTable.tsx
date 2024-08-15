import React, { useState } from 'react';
import { Table, TableColumnsType, MenuProps, Dropdown, Space } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { statusFormatter } from '@utils/functions';
import CustomDropdown from './CustomDropdown';

interface ListTableProps {
  onClick: () => void;
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
    render: (date: Dayjs) => date.format('YYYY-MM-DD'),
    sorter: (a, b) => a.startDate.unix() - b.startDate.unix(),
  },
  {
    title: '목표일',
    dataIndex: 'endDate',
    align: 'center',
    render: (date: Dayjs) => date.format('YYYY-MM-DD'),
    sorter: (a, b) => a.endDate.unix() - b.endDate.unix(),
  },
  {
    title: '완료일',
    dataIndex: 'compDate',
    align: 'center',
    render: (date: Dayjs) => date.format('YYYY-MM-DD'),
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
    render: () => <CustomDropdown />,
  },
];

const data: DataType[] = [
  {
    key: '1',
    title: '플러터 공부',
    startDate: dayjs('2024-08-20'),
    endDate: dayjs('2024-08-24'),
    compDate: dayjs(),
    status: 'before',
  },
  {
    key: '2',
    title: '책 읽기',
    startDate: dayjs('2024-08-18'),
    endDate: dayjs('2024-08-19'),
    compDate: dayjs(),
    status: 'before',
  },
  {
    key: '3',
    title: 'todolist 만들기',
    startDate: dayjs('2024-08-11'),
    endDate: dayjs('2024-08-30'),
    compDate: dayjs(),
    status: 'progress',
  },
  {
    key: '4',
    title: '요리하기',
    startDate: dayjs('2024-08-01'),
    endDate: dayjs('2024-08-13'),
    compDate: dayjs(),
    status: 'progress',
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
const ListTable = () => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  return (
    <div>
      {/* <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider /> */}

      <Table
        rowSelection={{
          // type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        size="middle"
      />
    </div>
  );
};

export default ListTable;
