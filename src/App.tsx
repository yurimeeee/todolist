import { TabsProps } from 'antd';
import TabMenu from '@components/TabMenu';
import CustomCalendar from '@components/CustomCalendar';
import BoardViewSection from '@pages/BoardViewSection';
import WriteModal from '@components/WriteModal';
import FloatInfoBtn from '@components/FloatInfoBtn';
import { Button, Modal, Space } from 'antd';
import AllViewSection from '@pages/AllViewSection';
import ListViewSection from '@pages/ListViewSection';

function App() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const tabContents: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children: <AllViewSection />,
    },
    {
      key: '2',
      label: 'Calendar',
      children: <CustomCalendar />,
    },
    {
      key: '3',
      label: 'List',
      children: <ListViewSection />,
    },
    {
      key: '4',
      label: 'Board',
      children: <BoardViewSection />,
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
      {/* <WriteModal /> */}
      <FloatInfoBtn onClick={info} />
    </div>
  );
}

export default App;
