import styled from 'styled-components';
import { Flex } from 'antd';

import { Todo } from 'src/types/type';
import ListTable from '@components/ListTable';
import CustomCard from '@components/CustomCard';
import CustomCalendar from '@components/CustomCalendar';

interface AllViewSectionProps {
  data: Todo[];
}

const AllViewSection = ({ data }: AllViewSectionProps) => {
  return (
    <Wrap>
      <Flex gap={16}>
        <CardContainer>
          <Header>진행예정</Header>
          {data
            ?.filter((item) => item.status === 'before')
            .slice(0, 2)
            .map((item, idx) => (
              <CustomCard data={item} key={idx} />
            ))}
        </CardContainer>
        <CardContainer>
          <Header>진행중</Header>
          {data
            ?.filter((item) => item.status === 'progress')
            .slice(0, 2)
            .map((item, idx) => (
              <CustomCard data={item} key={idx} />
            ))}
        </CardContainer>
        <CardContainer>
          <Header>완료</Header>
          {data
            ?.filter((item) => item.status === 'complete')
            .slice(0, 2)
            .map((item, idx) => (
              <CustomCard data={item} key={idx} />
            ))}
        </CardContainer>
        <CardContainer>
          <Header>보류</Header>
          {data
            ?.filter((item) => item.status === 'cancel')
            .slice(0, 2)
            .map((item, idx) => (
              <CustomCard data={item} key={idx} />
            ))}
        </CardContainer>
      </Flex>
      <Flex gap={16}>
        <CalendarBox>
          <CustomCalendar data={data} />
        </CalendarBox>
        <ListBox>
          <ListTable />
        </ListBox>
      </Flex>
    </Wrap>
  );
};

export default AllViewSection;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
const Header = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebf6ff;
`;
const CalendarBox = styled.div`
  width: 55%;
`;
const ListBox = styled.div`
  width: 45%;
`;
