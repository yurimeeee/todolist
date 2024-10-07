import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType, Space, Button, Flex, Input } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { statusFormatter } from '@utils/functions';
import CustomDropdown from './CustomDropdown';
import { Todo } from 'src/types/type';
import { supabase } from '@api/supabaseClient';
import { detailModalStore, toDoListStore, userInfoStore } from '@store/store';
import useDeleteToDo from '@hooks/useDeleteToDo';

const { Search } = Input;
interface ListTableProps {
  data?: Todo[];
  isActiveDelete?: boolean;
  // onClick: () => void;
}

interface DataType {
  key: React.Key;
  title: string;
  startDate: Dayjs;
  endDate: Dayjs;
  compDate: Dayjs;
  status: 'before' | 'progress' | 'complete' | 'stop' | 'cancel';
}

// const columns: TableColumnsType<DataType> = [

const ListTable = ({ isActiveDelete = false }: ListTableProps) => {
  const { userInfo } = userInfoStore();
  const { setIsDetailOpen, setDetailId, setTodoData } = detailModalStore();

  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { toDoList, setToDoList } = toDoListStore();
  const [data, setData] = useState<Todo[]>(toDoList);
  const [checkedList, setCheckedList] = useState<React.Key[]>([]);
  const { deleteToDo } = useDeleteToDo();

  const columns: TableColumnsType<DataType> = [
    {
      title: '할일',
      dataIndex: 'title',
      // render: (text: string) => <a>{text}</a>,
      render: (text: string, record: DataType) => (
        <a
          onClick={() => {
            setDetailId(record.key as string);
            setIsDetailOpen(true);
            setTodoData(record as any);
          }}
        >
          {text}
        </a>
      ),
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
      key: 'key',
      align: 'center',
      fixed: 'right',
      width: 52,
      render: (key: any) => <CustomDropdown todoId={key?.key} />,
    },
  ];

  // Todo 타입을 DataType으로 변환하는 함수
  const convertTodosToDataType = (todos: Todo[]): any[] => {
    return todos?.map((todo) => ({
      key: todo.id,
      title: todo.title,
      startDate: todo.period && todo.period[0] ? dayjs(todo.period[0]) : null,
      endDate: todo.period && todo.period[1] ? dayjs(todo.period[1]) : null,
      compDate: todo.compDate ? dayjs(todo.compDate) : null,
      status: todo.status,
    }));
  };

  const getData = async (uid?: string) => {
    const { data, error } = await supabase.from('todo').select('*').eq('uid', uid);

    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setData(data);
    }
  };

  useEffect(() => {
    getData(userInfo?.id);
  }, [userInfo?.id, toDoList]);

  const onSearch = async (value: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('todo').select('*').eq('uid', userInfo?.id).or(`title.like.%${value}%,content.like.%${value}%`);

      if (data) setData(data);
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      console.log(selectedRowKeys);
      setCheckedList(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.title === 'Disabled User',
      title: record.title,
    }),
  };

  return (
    <div>
      <Flex justify="space-between" style={{ marginBottom: '24px' }}>
        <Flex gap={8}>
          <Search
            placeholder="검색어를 입력하세요..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={onSearch}
            style={{ width: 240 }}
            allowClear
            loading={loading}
          />
          <Button
            type="default"
            onClick={() => {
              setSearchText('');
              setData(toDoList);
            }}
          >
            검색 결과 초기화
          </Button>
        </Flex>
        {isActiveDelete && (
          <Flex justify="end">
            <Button type="default" danger onClick={() => deleteToDo(checkedList, userInfo?.id)}>
              선택 삭제
            </Button>
          </Flex>
        )}
      </Flex>
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
