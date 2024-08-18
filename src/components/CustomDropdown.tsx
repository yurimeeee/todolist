// import { Dropdown, MenuProps, message, Space } from 'antd';
// import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
// import { supabase } from '@api/supabaseClient';
// import { toDoListStore } from '@store/store';

// interface CustomDropdownProps {
//   todoId: string;
// }

// const CustomDropdown = async ({ todoId }: CustomDropdownProps) => {
//   const { setToDoList } = toDoListStore();

//   // 일정 수정
//   const handleUpdate = async () => {
//     if (window.confirm('일정을 수정하시겠습니까?')) {
//       try {
//         // Assuming you're updating some fields. Replace `name: 'Australia'` with actual fields to update.
//         await supabase.from('todo').update({ name: 'Australia' }).eq('id', todoId);

//         const { data: toDoData } = await supabase.from('todo').select('*');
//         setToDoList(toDoData);

//         message.success('일정이 수정 되었습니다!', 0.7);
//       } catch (error) {
//         console.error('Error updating data:', (error as Error).message);
//       }
//     }
//   };

//   // 일정 삭제
//   const handleDelete = async () => {
//     if (window.confirm('일정을 삭제하시겠습니까?')) {
//       try {
//         await supabase.from('todo').delete().eq('id', todoId);

//         const { data: toDoData } = await supabase.from('todo').select('*');
//         setToDoList(toDoData);

//         message.success('일정이 삭제 되었습니다!', 0.7);
//       } catch (error) {
//         console.error('Error deleting data:', (error as Error).message);
//       }
//     }
//   };

//   const items: MenuProps['items'] = [
//     {
//       key: '1',
//       icon: <EditOutlined />,
//       label: '수정',
//       onClick: () => alert('수정'),
//     },
//     {
//       key: '2',
//       danger: true,
//       icon: <DeleteOutlined />,
//       label: '삭제',
//       onClick: handleDelete,
//     },
//   ];

//   return (
//     <Dropdown menu={{ items }} trigger={['click']}>
//       <Space>
//         <MoreOutlined />
//       </Space>
//     </Dropdown>
//   );
// };

// export default CustomDropdown;

import React, { useState } from 'react';
import { Dropdown, MenuProps, message, Space } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { supabase } from '@api/supabaseClient';
import { toDoListStore } from '@store/store';
import WriteModal from './WriteModal';

interface CustomDropdownProps {
  todoId: string;
}

const CustomDropdown = ({ todoId }: CustomDropdownProps) => {
  const { setToDoList } = toDoListStore();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleUpdate = async () => {
    if (window.confirm('일정을 수정하시겠습니까?')) {
      setIsUpdateModalOpen(true);
      // try {
      //   await supabase.from('todo').update({ name: 'Australia' }).eq('id', todoId);

      //   const { data: toDoData } = await supabase.from('todo').select('*');
      //   setToDoList(toDoData);

      //   message.success('일정이 수정 되었습니다!', 0.7);
      // } catch (error) {
      //   console.error('Error updating data:', (error as Error).message);
      // }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('일정을 삭제하시겠습니까?')) {
      try {
        await supabase.from('todo').delete().eq('id', todoId);

        const { data: toDoData } = await supabase.from('todo').select('*');
        setToDoList(toDoData);

        message.success('일정이 삭제 되었습니다!', 0.7);
      } catch (error) {
        console.error('Error deleting data:', (error as Error).message);
      }
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: '수정',
      onClick: handleUpdate,
    },
    {
      key: '2',
      danger: true,
      icon: <DeleteOutlined />,
      label: '삭제',
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Space>
          <MoreOutlined />
        </Space>
      </Dropdown>
      <WriteModal open={isUpdateModalOpen} setOpen={setIsUpdateModalOpen} updateMode={true} todoId={todoId} />
    </>
  );
};

export default CustomDropdown;
