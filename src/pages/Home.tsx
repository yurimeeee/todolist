import { useEffect } from 'react';
import { Modal, TabsProps } from 'antd';

import TabMenu from '@components/TabMenu';
import CustomCalendar from '@components/CustomCalendar';
import BoardViewSection from '@components/layout/BoardViewSection';
import FloatInfoBtn from '@components/FloatInfoBtn';
import AllViewSection from '@components/layout/AllViewSection';
import ListViewSection from '@components/layout/ListViewSection';

import { modalStore, toDoListStore } from '@store/store';
import { supabase } from '@api/supabaseClient';
import WriteModal from '@components/WriteModal';

function Home() {
  const { toDoList, setToDoList } = toDoListStore();
  const { isOpen, setIsOpen, toDoId, isUpateMode } = modalStore();
  const getData = async () => {
    const { data, error } = await supabase.from('todo').select('*');
    setToDoList(data);
  };

  useEffect(() => {
    getData();
    console.log(toDoList);
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  const tabContents: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children: <AllViewSection data={toDoList} />,
    },
    {
      key: '2',
      label: 'Calendar',
      children: <CustomCalendar data={toDoList} />,
    },
    {
      key: '3',
      label: 'List',
      children: <ListViewSection />,
    },
    {
      key: '4',
      label: 'Board',
      children: <BoardViewSection data={toDoList} />,
    },
  ];

  const info = () => {
    Modal.info({
      title: 'About',
      content: (
        <div>
          <p>To do all은 직장인의 스케줄 관리에 적합한 1달 단위 스케줄러입니다.</p>
          <p>투두 리스트 + 캘린더 + 보드 형식으로 사용할 수 있습니다.</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div className="App">
      <TabMenu tabContents={tabContents} onChange={onChange} />
      <WriteModal open={isOpen} setOpen={setIsOpen} todoId={toDoId} updateMode={isUpateMode} />
      <FloatInfoBtn onClick={info} />
    </div>
  );
}

export default Home;
