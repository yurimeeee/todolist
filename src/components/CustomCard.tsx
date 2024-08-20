import styled from 'styled-components';
import { Badge, Card } from 'antd';
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
  const [todoId, setTodoId] = useState('');

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
          <TitleBox>
            <Icon>
              <Badge color={data.toDoType} status={data.status === 'progress' ? 'processing' : 'default'} />
            </Icon>
            {data.title}
          </TitleBox>
        }
        extra={<CustomDropdown todoId={data.id} />}
      >
        <Contents>
          <p>{data.content}</p>
          <BadgeBox>
            <Badge count={renderDday(data.period[1])} showZero color="#a7c3eb" />
          </BadgeBox>
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

const TitleBox = styled.div`
  display: flex;
  gap: 6px;
`;
const BadgeBox = styled.div`
  display: flex;
  justify-content: end;
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
`;
