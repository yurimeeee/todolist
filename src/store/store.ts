import { create } from 'zustand' // create로 zustand를 불러옵니다.
import { User } from '@supabase/supabase-js';
import { SetStateAction } from 'react';
import { Todo } from 'src/types/type';
// const useStore = create(set => ({
//   bears: 0,
//   increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 })
// }))

export const useStore = create((set) => ({
  count: 1,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
}))

//  default useStore

// export const useMemosStore = create((set) => ({
//   memo: '',
//   setMemo: (text: any) => set({ memo: text }),
//   memos: [],
//   setMemos: (newMemo: any) =>
//     set((prev: any) => ({
//       memos: [...prev.memos, newMemo],
//     })),
// }));

// Define your store's state and actions
// type MemosState = {
//   memo: string;
//   setMemo: (memo: string) => void;
//   setMemos: (memos: string[]) => void;
// };


// export const useMemosStore = create<MemosState>((set) => ({
//   memo: 'ddd',
//   setMemo: (memo) => set({ memo }),
//   setMemos: (memos) => {
//     // Handle the setting of multiple memos if necessary
//   },
// }));


type UserState = {
  userInfo: User | null;
  setUserInfo: (userInfo: User | null) => void;
};

export const userInfoStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: any) => set({ userInfo }),
}));

type ToDoListState = {
  toDoList: any | null;
  setToDoList: (toDoList: any | null) => void;
  updateTodoStatus: (id: string, newStatus: string) => void;
};

export const toDoListStore = create<ToDoListState>((set) => ({
  toDoList: null,
  setToDoList: (toDoList: any) => set({ toDoList }),
  updateTodoStatus: (id: string, newStatus: string) =>
    set((state) => ({
      toDoList: state.toDoList
        ? state.toDoList.map((todo: Todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
        : null,
    })),
}));

type ModalState = {
  isOpen: boolean;
  // setIsOpen: (isOpen: boolean) => void;
  setIsOpen: (isOpen: SetStateAction<boolean>) => void;
  toDoId: string | null | undefined;
  setToDoId: (toDoId: string | null | undefined) => void;
  isUpateMode: boolean;
  setIsUpateMode: (isUpateMode: boolean) => void;
};

export const modalStore = create<ModalState>((set) => ({
  isOpen: false,
  // setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setIsOpen: (isOpen) => set((state) => ({
    isOpen: typeof isOpen === 'function' ? (isOpen as (prev: boolean) => boolean)(state.isOpen) : isOpen
  })),
  toDoId: null,
  setToDoId: (toDoId: string | null | undefined) => set({ toDoId }),
  isUpateMode: false,
  setIsUpateMode: (isUpateMode: boolean) => set({ isUpateMode }),
}));

type DetailModalState = {
  isDetailOpen: boolean;
  setIsDetailOpen: (isDetailOpen: SetStateAction<boolean>) => void;
  detailId: string | null | undefined;
  setDetailId: (detailId: string | null | undefined) => void;
  todoData: Todo | null;
  setTodoData: (todoData: Todo | null) => void;
};

export const detailModalStore = create<DetailModalState>((set) => ({
  isDetailOpen: false,
  setIsDetailOpen: (isDetailOpen) => set((state) => ({
    isDetailOpen: typeof isDetailOpen === 'function' ? (isDetailOpen as (prev: boolean) => boolean)(state.isDetailOpen) : isDetailOpen
  })),
  detailId: null,
  setDetailId: (detailId: string | null | undefined) => set({ detailId }),
  todoData: null,
  setTodoData: (todoData: Todo | null) => set({ todoData }),
}));


// export const modalState = atom({
//   key: 'modalState',
//   default: {
//     isVisible: false,
//     currentIndex: null,
//   },
// });