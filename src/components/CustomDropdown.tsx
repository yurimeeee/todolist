import { Dropdown, MenuProps, Space } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';

interface CustomDropdownProps {
  todoId?: number;
}

const CustomDropdown = ({ todoId }: CustomDropdownProps) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: '수정',
      onClick: () => alert('수정'),
    },
    {
      key: '2',
      danger: true,
      icon: <DeleteOutlined />,
      label: '삭제',
      onClick: () => alert('삭제'),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Space>
        <MoreOutlined />
      </Space>
    </Dropdown>
  );
};

export default CustomDropdown;
