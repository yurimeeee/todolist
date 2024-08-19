import styled from 'styled-components';
import { Badge, Card } from 'antd';
import { CardSize } from 'antd/es/card/Card';

import { Todo } from 'src/types/type';
import CustomDropdown from './CustomDropdown';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

interface CustomCardProps {
  data: Todo;
  width?: string;
  maxWidth?: string;
  size?: CardSize;
}

const CustomCard = ({ data, width = '100%', maxWidth, size = 'small' }: CustomCardProps) => {
  // const getCalculatedDay = (date: Dayjs | null) => {
  //   let calculatedDay = date?.diff(dayjs(), 'days');
  //   if (calculatedDay && calculatedDay > 0) {
  //     return `D-${calculatedDay}`;
  //   } else if (calculatedDay === 0) {
  //     return 'D-day';
  //   } else {
  //     return `D+${calculatedDay * -1}`;
  //   }
  // };
  const getCalculatedDay = (date: Dayjs | null): number => {
    if (!date) return 0; // Handle case where date might be null
    const today = dayjs(); // Assume dayjs is imported and used
    const diffInDays = date.diff(today, 'day');
    return diffInDays;
  };

  const renderDday = () => {
    const calculatedDay = getCalculatedDay(dayjs(data?.period[1]));
    if (calculatedDay === 0) {
      return 'D-day';
    } else if (calculatedDay < 0) {
      return `D+${calculatedDay * -1}`;
    } else {
      return `D-${calculatedDay}`;
    }
  };

  return (
    <Wrapper width={width} maxWidth={maxWidth} status={data.status}>
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
          <BadgeBox>{/* <Badge count={renderDday()} showZero color="#a7c3eb" /> */}</BadgeBox>
        </Contents>
      </Card>
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
