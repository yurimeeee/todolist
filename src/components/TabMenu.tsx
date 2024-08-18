import styled from 'styled-components';
import { Tabs, Button, TabsProps } from 'antd';
import WriteModal from './WriteModal';

const Wrap = styled.div``;

interface TabMenuProps {
  tabContents: TabsProps['items'];
  onChange: (key: string) => void;
}
// const operations = <WriteModal />;

const TabMenu = ({ tabContents, onChange }: TabMenuProps) => {
  return (
    <Wrap>
      <Tabs
        defaultActiveKey="1"
        items={tabContents}
        onChange={onChange}
        // tabBarExtraContent={operations}
      />
    </Wrap>
  );
};

export default TabMenu;
