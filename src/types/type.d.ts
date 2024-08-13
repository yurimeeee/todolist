import { Dayjs } from 'dayjs';

// 일정 type
export interface ToDoItem {
  key: number;
  title: string;
  content: string;
  startDate: Dayjs;
  endDate: Dayjs;
  compDate?: Dayjs | null;
  priority: 'H' | 'M' | 'L';
  status: 'before' | 'progress' | 'complete' | 'stop' | 'cancel';
  toDoType: string;
}

// before : 진행예정, 진행전
// progress : 진행중
// complete : 완료
// stop : 일시정지
// cancel : 보류
