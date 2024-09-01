import { useEffect } from 'react';
import { Modal, TabsProps } from 'antd';

import TabMenu from '@components/TabMenu';
import CustomCalendar from '@components/CustomCalendar';
import BoardViewSection from '@components/layout/BoardViewSection';
import FloatInfoBtn from '@components/FloatInfoBtn';
import AllViewSection from '@components/layout/AllViewSection';
import ListViewSection from '@components/layout/ListViewSection';

import { detailModalStore, modalStore, toDoListStore, userInfoStore } from '@store/store';
import { supabase } from '@api/supabaseClient';
import WriteModal from '@components/WriteModal';
import DetailViewModal from '@components/DetailViewModal';

function Home() {
  const { userInfo } = userInfoStore();
  const { toDoList, setToDoList } = toDoListStore();
  const { isOpen, setIsOpen, toDoId, isUpateMode } = modalStore();
  const { isDetailOpen, setIsDetailOpen, detailId } = detailModalStore();

  const getData = async (uid?: string) => {
    const { data, error } = await supabase.from('todo').select('*').eq('uid', uid);

    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }

    setToDoList(data);
  };

  useEffect(() => {
    getData(userInfo?.id);
  }, [userInfo?.id]);

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
      children: <ListViewSection data={toDoList} />,
    },
    {
      key: '4',
      label: 'Board',
      children: <BoardViewSection data={toDoList} setData={setToDoList} />,
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
      <TabMenu tabContents={tabContents} />
      {/* 일정 작성/수정 모달 */}
      <WriteModal open={isOpen} setOpen={setIsOpen} todoId={toDoId} updateMode={isUpateMode} />
      {/* 상세보기 모달 */}
      <DetailViewModal open={isDetailOpen} setOpen={setIsDetailOpen} todoId={detailId} data={null} />
      <FloatInfoBtn onClick={info} />
    </div>
  );
}

export default Home;
