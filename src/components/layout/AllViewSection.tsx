import styled from 'styled-components';
import CustomCalendar from '@components/CustomCalendar';
import ListTable from '@components/ListTable';
import CustomCard from '@components/CustomCard';
import { Todo } from 'src/types/type';

interface AllViewSectionProps {
  data: Todo[];
}

const AllViewSection = ({ data }: AllViewSectionProps) => {
  return (
    <Wrap>
      <CardSection>
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
      </CardSection>
      <FlexBox>
        <CalendarBox>
          <CustomCalendar data={data} />
        </CalendarBox>
        <ListBox>
          <ListTable data={data} />
        </ListBox>
      </FlexBox>
    </Wrap>
  );
};

export default AllViewSection;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const CardSection = styled.div`
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
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebf6ff;
`;
const FlexBox = styled.div`
  display: flex;
  gap: 16px;
`;
const CalendarBox = styled.div`
  width: 55%;
`;
const ListBox = styled.div`
  width: 45%;
`;
