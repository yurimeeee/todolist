import styled from 'styled-components';
import { DndContext } from '@dnd-kit/core';

import { tmpData } from '@utils/functions';
import CustomCard from '@components/CustomCard';
import { supabase } from '@api/supabaseClient';
import { useEffect } from 'react';
import { Todo } from 'src/types/type';

interface BoardViewSectionProps {
  data: Todo[];
}
const BoardViewSection = ({ data }: BoardViewSectionProps) => {
  return (
    <Wrap>
      <CardContainer>
        <DndContext>
          {/* <Droppable>
            <Draggable></Draggable>
          </Droppable> */}
        </DndContext>
        <Header>진행예정</Header>
        {data
          ?.filter((item) => item.status === 'before')
          .map((item, idx) => (
            <CustomCard data={item} key={idx} />
          ))}
      </CardContainer>
      <CardContainer>
        <Header>진행중</Header>
        {data
          ?.filter((item) => item.status === 'progress')
          .map((item, idx) => (
            <CustomCard data={item} key={idx} />
          ))}
      </CardContainer>
      <CardContainer>
        <Header>완료</Header>
        {data
          ?.filter((item) => item.status === 'complete')
          .map((item, idx) => (
            <CustomCard data={item} key={idx} />
          ))}
      </CardContainer>
      <CardContainer>
        <Header>보류</Header>
        {data
          ?.filter((item) => item.status === 'cancel')
          .map((item, idx) => (
            <CustomCard data={item} key={idx} />
          ))}
      </CardContainer>
    </Wrap>
  );
};

export default BoardViewSection;

const Wrap = styled.div`
  display: flex;
  gap: 16px;
`;
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
