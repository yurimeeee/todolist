import styled from 'styled-components';
import { DndContext } from '@dnd-kit/core';

import { Flex, message } from 'antd';
import { Todo } from 'src/types/type';
import CustomCard from '@components/CustomCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { supabase } from '@api/supabaseClient';
interface BoardViewSectionProps {
  data: Todo[];
  setData: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const BoardViewSection = ({ data, setData }: BoardViewSectionProps) => {
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    console.log(result);
    // 드래그가 시작된 위치와 드래그가 끝난 위치가 같지 않으면 처리
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    // 드래그된 카드의 index
    const draggedIndex = source.index;

    // 드래그된 카드 데이터
    const draggedItem = data.find((_, index) => index === draggedIndex);

    if (draggedItem) {
      // 새로운 상태를 드래그된 위치에 따라 설정
      let newStatus = '';
      switch (destination.droppableId) {
        case 'progress':
          newStatus = 'progress';
          break;
        case 'complete':
          newStatus = 'complete';
          break;
        case 'cancel':
          newStatus = 'cancel';
          break;
        case 'before':
          newStatus = 'before';
          break;
        default:
          return;
      }

      try {
        const { error } = await supabase.from('todo').update({ status: newStatus }).eq('id', draggableId).select();
        if (error) throw error;

        const { data: toDoData } = await supabase.from('todo').select('*');
        setData(toDoData as any);
        message.success(`${getHeaderTitle(newStatus)}(으)로 상태가 변경되었습니다.`, 0.7);
      } catch (error) {
        console.error('Error inserting data:', (error as Error).message);
      }

      // 카드의 상태를 업데이트
      const updatedData = data.map((item, index) => (index === draggedIndex ? { ...item, status: newStatus } : item));

      // 업데이트된 데이터를 상태로 설정
      setData(updatedData as any);
    }
  };

  const getHeaderTitle = (status: string) => {
    switch (status) {
      case 'before':
        return '진행예정';
      case 'progress':
        return '진행중';
      case 'complete':
        return '완료';
      case 'cancel':
        return '보류';
      default:
        return '';
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex gap={16}>
        {['before', 'progress', 'complete', 'cancel'].map((status) => (
          <CardContainer key={status}>
            <Header>{getHeaderTitle(status)}</Header>
            <CustomDroppable droppableId={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {data
                    ?.filter((item) => item.status === status)
                    .map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <CustomCard data={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </CustomDroppable>
          </CardContainer>
        ))}
      </Flex>
    </DragDropContext>
  );
};

export default BoardViewSection;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background: #ebf6ff;
`;
const CustomDroppable = styled(Droppable)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
