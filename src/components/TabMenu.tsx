import React from 'react';
import styled from 'styled-components';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';

const Wrap = styled.div``;

interface TabMenuProps {
  tabContents: TabsProps['items'];
  onChange: (key: string) => void;
}
const operations = (
  <Button type="primary" ghost>
    Add to Do
  </Button>
);

const TabMenu = ({ tabContents, onChange }: TabMenuProps) => {
  return (
    <Wrap>
      <Tabs defaultActiveKey="1" items={tabContents} onChange={onChange} tabBarExtraContent={operations} />
    </Wrap>
  );
};

export default TabMenu;
