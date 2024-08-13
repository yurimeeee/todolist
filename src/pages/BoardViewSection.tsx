import styled from 'styled-components';
import { Card } from 'antd';
import { DndContext } from '@dnd-kit/core';
import { tmpData } from '@utils/functions';

// import { Draggable } from './Draggable';
// import { Droppable } from './Droppable';

const BoardViewSection = () => {
  return (
    <Wrap>
      <CardContainer>
        <DndContext>
          {/* <Droppable>
            <Draggable></Draggable>
          </Droppable> */}
        </DndContext>
        <Header>진행예정</Header>
        {tmpData
          ?.filter((item) => item.status === 'before')
          .map((item) => (
            <Card key={item.key} size="small" title={item.title} extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>{item.content}</p>
            </Card>
          ))}
      </CardContainer>
      <CardContainer>
        <Header>진행중</Header>
        {tmpData
          ?.filter((item) => item.status === 'progress')
          .map((item) => (
            <Card key={item.key} size="small" title={item.title} extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>{item.content}</p>
            </Card>
          ))}
      </CardContainer>
      <CardContainer>
        <Header>완료</Header>
        {tmpData
          ?.filter((item) => item.status === 'complete')
          .map((item) => (
            <Card key={item.key} size="small" title={item.title} extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>{item.content}</p>
            </Card>
          ))}
      </CardContainer>
      <CardContainer>
        <Header>보류</Header>
        {tmpData
          ?.filter((item) => item.status === 'cancel')
          .map((item) => (
            <Card key={item.key} size="small" title={item.title} extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>{item.content}</p>
            </Card>
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
`;
const Header = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebebeb;
`;
