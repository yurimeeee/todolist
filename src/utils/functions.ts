import { ToDoItem } from "src/types/type";
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export const statusFormatter = (status?: string) => {
  switch (status) {
    case 'before':
      return '진행예정';
    case 'progress':
      return '진행중';
    case 'complete':
      return '완료';
    case 'stop':
      return '일시정지';
    case 'cancel':
      return '보류';
  }
};

export const getCalculatedDay = (date: Dayjs | null): number => {
  if (!date) return 0;
  const today = dayjs();
  const diffInDays = date.diff(today, 'day');
  return diffInDays;
};

export const renderDday = (date: string | null) => {
  const calculatedDay = getCalculatedDay(dayjs(date));
  if (calculatedDay === 0) {
    return 'D-day';
  } else if (calculatedDay < 0) {
    return `D+${calculatedDay * -1}`;
  } else {
    return `D-${calculatedDay}`;
  }
};

export const tmpData: ToDoItem[] = [
  {
    key: 1,
    title: 'todolist 만들기',
    content: '리액트로 일정관리를 만들어보자',
    startDate: dayjs('2024-08-5'),
    endDate: dayjs('2024-08-24'),
    compDate: null,
    priority: 'H',
    status: 'progress',
    toDoType: 'blue',
  },
  {
    key: 2,
    title: '플러터 공부',
    content: '재미있는 플러터를 배워보자',
    startDate: dayjs('2024-08-20'),
    endDate: dayjs('2024-08-24'),
    compDate: null,
    priority: 'M',
    status: 'before',
    toDoType: 'blue',
  },
  {
    key: 3,
    title: '운동하기',
    content: '매일매일 스쿼트를 해보자',
    startDate: dayjs('2024-08-01'),
    endDate: dayjs('2024-08-14'),
    compDate: dayjs('2024-08-13'),
    priority: 'L',
    status: 'complete',
    toDoType: 'blue',
  },
  {
    key: 4,
    title: '책 읽기',
    content: '하루에 한 권 읽기',
    startDate: dayjs('2024-08-18'),
    endDate: dayjs('2024-08-19'),
    compDate: null,
    priority: 'M',
    status: 'before',
    toDoType: 'green',
  },
  {
    key: 5,
    title: '요리하기',
    content: '새로운 레시피 도전',
    startDate: dayjs('2024-08-01'),
    endDate: dayjs('2024-08-13'),
    compDate: null,
    priority: 'L',
    status: 'progress',
    toDoType: 'yellow',
  },
  {
    key: 6,
    title: '영화 보기',
    content: '주말에 영화 한 편 감상',
    startDate: dayjs('2024-08-03'),
    endDate: dayjs('2024-08-4'),
    compDate: dayjs('2024-08-03'),
    priority: 'H',
    status: 'complete',
    toDoType: 'red',
  },
  {
    key: 7,
    title: '토이 프로젝트',
    content: 'next.js로 작은 프로젝트를 만들어보자',
    startDate: dayjs('2024-08-7'),
    endDate: dayjs('2024-08-17'),
    compDate: null,
    priority: 'L',
    status: 'cancel',
    toDoType: 'red',
  },
];
