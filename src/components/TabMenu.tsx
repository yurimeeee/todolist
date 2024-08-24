import styled from 'styled-components';
import { Tabs, Button, TabsProps } from 'antd';

const Wrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

interface TabMenuProps {
  tabContents: TabsProps['items'];
  onChange: (key: string) => void;
}

const TabMenu = ({ tabContents, onChange }: TabMenuProps) => {
  return (
    <Wrap>
      <Tabs defaultActiveKey="1" items={tabContents} onChange={onChange} />
    </Wrap>
  );
};

export default TabMenu;
