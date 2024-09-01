import styled from 'styled-components';
import { Tabs, TabsProps } from 'antd';

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

interface TabMenuProps {
  tabContents: TabsProps['items'];
}

const TabMenu = ({ tabContents }: TabMenuProps) => {
  return (
    <Wrap>
      <Tabs defaultActiveKey="1" items={tabContents} />
    </Wrap>
  );
};

export default TabMenu;
