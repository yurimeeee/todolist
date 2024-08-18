import styled from 'styled-components';
import { Card } from 'antd';
import CustomCalendar from '@components/CustomCalendar';
import ListTable from '@components/ListTable';
import { tmpData } from '@utils/functions';
import CustomCard from '@components/CustomCard';
import { Todo } from 'src/types/type';

//   {
//     key: 1,
//     title: 'todolist 만들기',
//     content: '리액트로 일정관리를 만들어보자',
//     startDate: dayjs(),
//     endDate: dayjs(),
//     priority: 'H',
//     status: 'progress',
//     toDoType: 'blue',
//   },
//   {
//     key: 2,
//     title: '플러터 공부',
//     content: '재미있는 플러터를 배워보자',
//     startDate: dayjs(),
//     endDate: dayjs(),
//     priority: 'M',
//     status: 'before',
//     toDoType: 'blue',
//   },
//   {
//     key: 3,
//     title: '운동하기',
//     content: '매일매일 스쿼트를 해보자',
//     startDate: dayjs(),
//     endDate: dayjs(),
//     priority: 'L',
//     status: 'complete',
//     toDoType: 'blue',
//   },
//   {
//     key: 4,
//     title: '책 읽기',
//     content: '하루에 한 권 읽기',
//     startDate: dayjs(),
//     endDate: dayjs(),
//     priority: 'M',
//     status: 'before',
//     toDoType: 'green',
//   },
//   {
//     key: 5,
//     title: '요리하기',
//     content: '새로운 레시피 도전',
//     startDate: dayjs(),
//     endDate: dayjs(),
//     priority: 'L',
//     status: 'progress',
//     toDoType: 'yellow',
//   },
//   {
//     key: 6,
//     title: '영화 보기',
//     content: '주말에 영화 한 편 감상',
//     startDate: dayjs(),
//     endDate: dayjs(),
//     priority: 'H',
//     status: 'complete',
//     toDoType: 'red',
//   },
//   {
//     key: 7,
//     title: '토이 프로젝트',
//     content: 'next.js로 작은 프로젝트를 만들어보자',
//     startDate: dayjs(),
//     endDate: dayjs(),
//     priority: 'L',
//     status: 'cancel',
//     toDoType: 'red',
//   },
// ];

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
        <CustomCalendar />
        <ListTable data={data} />
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
