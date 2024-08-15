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


export interface Todo {
  uid: string; // UUID
  title: string;
  content: string;
  period: [string | null, string | null]; // ISO 8601 date strings or null
  time: [string | null, string | null]; // ISO 8601 date strings or null
  compDate: string | null; // ISO 8601 date string or null
  priority: 'H' | 'M' | 'L'; // Priority levels (High, Medium, Low)
  status: 'before' | 'progress' | 'complete' | 'cancel'; // Status values
  toDoType: string; // Color in hex format
  createdAt: string; // ISO 8601 date string
  id: string; // UUID
}