import styled from 'styled-components';
import { Badge, Card, Flex } from 'antd';
import { CardSize } from 'antd/es/card/Card';

import { Todo } from 'src/types/type';
import CustomDropdown from './CustomDropdown';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { renderDday } from '@utils/functions';
import DetailViewModal from './DetailViewModal';
import { useState } from 'react';

interface CustomCardProps {
  data: Todo;
  width?: string;
  maxWidth?: string;
  size?: CardSize;
}

const CustomCard = ({ data, width = '100%', maxWidth, size = 'small' }: CustomCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper
      width={width}
      maxWidth={maxWidth}
      status={data.status}
      // onClick={() => {
      //   setTodoId(item.id);
      //   setIsModalOpen(true);
      //   setDetailData(item);
      // }}
    >
      <Card
        size={size}
        title={
          <Flex gap={6}>
            <Icon>
              <Badge color={data.toDoType} status={data.status === 'progress' ? 'processing' : 'default'} />
            </Icon>
            <Title
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {data.title}
            </Title>
          </Flex>
        }
        extra={<CustomDropdown todoId={data.id} />}
      >
        <Contents
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <p>{data.content}</p>
          <Flex justify="end">
            <Badge count={renderDday(data.period[1])} showZero color="#a7c3eb" />
          </Flex>
        </Contents>
      </Card>
      <DetailViewModal open={isModalOpen} setOpen={setIsModalOpen} todoId={data.id} data={data} />
    </Wrapper>
  );
};

export default CustomCard;

const Wrapper = styled.div<{ width?: string; maxWidth?: string; status?: string }>`
  width: ${({ width }) => width || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  opacity: ${({ status }) => (status === 'cancel' ? 0.6 : 1)};

  .ant-card {
    background: ${({ status }) => (status === 'cancel' ? '#f7f7f7' : '#FFF')};
  }
`;
const Title = styled.div`
  cursor: pointer;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3px;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
