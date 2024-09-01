import { Dropdown, Space } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';

import { modalStore, userInfoStore } from '@store/store';
import useDeleteToDo from '@hooks/useDeleteToDo';

interface CustomDropdownProps {
  todoId: string;
}

const CustomDropdown = ({ todoId }: CustomDropdownProps) => {
  const { userInfo } = userInfoStore();
  const { setIsOpen, setToDoId, setIsUpateMode } = modalStore();
  const { deleteToDo } = useDeleteToDo();

  const items = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: '수정',
      onClick: () => {
        setIsOpen(true);
        setIsUpateMode(true);
        setToDoId(todoId);
      },
    },
    {
      key: '2',
      danger: true,
      icon: <DeleteOutlined />,
      label: '삭제',
      onClick: () => deleteToDo(todoId, userInfo?.id),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Space>
          <MoreOutlined style={{ cursor: 'pointer' }} />
        </Space>
      </Dropdown>
    </>
  );
};

export default CustomDropdown;
