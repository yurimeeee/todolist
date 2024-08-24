import { message } from 'antd';
import { supabase } from '@api/supabaseClient';
import { toDoListStore } from '@store/store';

const useDeleteToDo = () => {
  const { setToDoList } = toDoListStore();

  const deleteToDo = async (todoId: string) => {
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

  return { deleteToDo };
};

export default useDeleteToDo;
