import { create } from 'zustand' // create로 zustand를 불러옵니다.
import { User } from '@supabase/supabase-js';
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
};

export const toDoListStore = create<ToDoListState>((set) => ({
  toDoList: null,
  setToDoList: (toDoList: any) => set({ toDoList }),
}));

