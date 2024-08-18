// import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Button, Form, FormProps, Input, message, Modal, Select, TimePicker } from 'antd';
// import { CalendarOutlined } from '@ant-design/icons';
// import { DatePicker, Space } from 'antd';
// import { FieldNamesType } from 'antd/es/cascader';
// import { supabase } from '@api/supabaseClient';
// import { Dayjs } from 'dayjs';
// import CustomTimePicker from './CustomTimePicker';
// import dayjs from 'dayjs';
// import { toDoListStore, userInfoStore } from '@store/store';
// import { Todo } from '../types/type';
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

// interface WriteModalProps {
//   updateMode?: boolean;
//   todoId?: string;
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   // onChange: (key: string) => void;
// }
// const WriteModal = ({ updateMode, todoId, open, setOpen }: WriteModalProps) => {
//   const { setToDoList } = toDoListStore();
//   const { userInfo } = userInfoStore();
//   const [form] = Form.useForm();

//   // const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [isAllDay, setIsAllDay] = useState(false);

//   const [data, setData] = useState({
//     title: '',
//     content: '',
//     period: [null, null] as [Dayjs | null, Dayjs | null],
//     time: [null, null] as [Dayjs | null, Dayjs | null],
//     compDate: null as Dayjs | null,
//     priority: '',
//     status: '',
//     toDoType: '',
//   });

//   useEffect(() => {
//     if (updateMode && todoId) {
//       const getToDoItem = async () => {
//         try {
//           const { data: toDoData, error } = await supabase.from('todo').select('*').eq('id', todoId).single();

//           if (error) throw error;

//           if (toDoData) {
//             setData({
//               title: toDoData.title,
//               content: toDoData.content,
//               period: [toDoData.period ? dayjs(toDoData.period[0]) : null, toDoData.period ? dayjs(toDoData.period[1]) : null],
//               time: [toDoData.time ? dayjs(toDoData.time[0]) : null, toDoData.time ? dayjs(toDoData.time[1]) : null],
//               compDate: toDoData.compDate ? dayjs(toDoData.compDate) : null,
//               priority: toDoData.priority,
//               status: toDoData.status,
//               toDoType: toDoData.toDoType,
//             });
//             // form.setFieldsValue({
//             //   title: toDoData.title,
//             //   content: toDoData.content,
//             //   period: toDoData.period ? [dayjs(toDoData.period[0]), dayjs(toDoData.period[1])] : [],
//             //   time: toDoData.time ? [dayjs(toDoData.time[0]), dayjs(toDoData.time[1])] : [],
//             //   compDate: toDoData.compDate ? dayjs(toDoData.compDate) : null,
//             //   priority: toDoData.priority,
//             //   status: toDoData.status,
//             //   toDoType: toDoData.toDoType,
//             // });
//           }
//         } catch (error) {
//           console.error('Error fetching data:', (error as Error).message);
//         }
//       };

//       getToDoItem();
//     }
//   }, [updateMode, todoId, open, form]);
//   // const getToDoItem = async () => {
//   //   if (updateMode) {
//   //     try {
//   //       const { data: toDoData } = await supabase.from('todo').select('*').eq('id', todoId).single();
//   //       if (toDoData) {
//   //         setData({
//   //           title: toDoData.title,
//   //           content: toDoData.content,
//   //           period: [toDoData.period ? dayjs(toDoData.period[0]) : null, toDoData.period ? dayjs(toDoData.period[1]) : null],
//   //           time: [toDoData.time ? dayjs(toDoData.time[0]) : null, toDoData.time ? dayjs(toDoData.time[1]) : null],
//   //           compDate: toDoData.compDate ? dayjs(toDoData.compDate) : null,
//   //           priority: toDoData.priority,
//   //           status: toDoData.status,
//   //           toDoType: toDoData.toDoType,
//   //         });
//   //       }
//   //     } catch (error) {
//   //       console.error('Error getToDoItem data:', (error as Error).message);
//   //     }
//   //     // console.log('수정할 data', data);
//   //   }
//   // };
//   // useEffect(() => {
//   //   if (updateMode && todoId) {
//   //     getToDoItem();
//   //   }
//   // }, [open]);

//   // const showModal = () => {
//   //   setOpen(true);
//   // };

//   const handleOk = async () => {
//     try {
//       setConfirmLoading(true);
//       const { error } = await supabase.from('todo').insert([
//         {
//           uid: userInfo?.id,
//           title: data.title,
//           content: data.content,
//           period: data.period,
//           time: data.time,
//           compDate: dayjs(),
//           priority: data.priority,
//           status: data.status,
//           toDoType: data.toDoType,
//         },
//       ]);
//       const { data: toDoData } = await supabase.from('todo').select('*');
//       setToDoList(toDoData);
//       message.success('일정이 등록 되었습니다!', 0.7);

//       if (error) throw error;
//     } catch (error) {
//       console.error('Error inserting data:', (error as Error).message);
//     } finally {
//       setTimeout(() => {
//         setOpen(false);
//         setConfirmLoading(false);
//       }, 1000);
//       form.resetFields(); // Reset form fields
//       // setData({
//       //   title: '',
//       //   content: '',
//       //   period: [null, null] as [Dayjs | null, Dayjs | null],
//       //   time: [null, null] as [Dayjs | null, Dayjs | null],
//       //   compDate: null,
//       //   priority: '',
//       //   status: '',
//       //   toDoType: '',
//       // });
//     }
//   };

//   const handleCancel = () => {
//     console.log('Clicked cancel button');
//     setOpen(false);
//   };

//   const titleRender = () => (
//     <TitleWrap>
//       <CalendarOutlined />
//       {updateMode ? '일정 수정' : '일정 추가'}
//     </TitleWrap>
//   );

//   const colorsList = ['#CC73E1', '#EF5350', '#F7ADC3', '#AB47BC', '#6F81E3', '#42A5F5', '#26C6DA', '#90E694', '#97DEB9', '#FCF403', '#FFB241', '#FF7043', '#BDBDBD', '#88BFBF'];

//   const onChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
//       const { name, value } = e.target;
//       setData((prev) => ({
//         ...prev,
//         [name]: value,
//         // 사이트 변경 시, 장비 초기화
//         // ...(name === 'site' && { equipment: '장비를 선택해주세요' }),
//       }));
//     },
//     [data]
//   );

//   const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
//     if (dates) {
//       setData((prev) => ({
//         ...prev,
//         period: dates,
//       }));
//     }
//   };
//   const handleTimeChange = (times: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
//     if (times) {
//       setData((prev) => ({
//         ...prev,
//         time: times,
//       }));
//     }
//   };

//   const onFinish = async (values: any) => {
//     try {
//       const { error } = await supabase
//         .from('todo') // Replace 'todo' with your table name
//         .insert([
//           {
//             title: values.title,
//             content: values.content,
//             period_start: values.period[0]?.toISOString() || null,
//             period_end: values.period[1]?.toISOString() || null,
//             time_start: values.time[0]?.toISOString() || null,
//             time_end: values.time[1]?.toISOString() || null,
//             priority: values.priority,
//             status: values.status,
//             toDoType: values.toDoType, // Assuming you store color as a field
//           },
//         ]);

//       if (error) throw error;

//       console.log('Data inserted successfully');
//       setOpen(false); // Close modal on success
//     } catch (error) {
//       console.error('Error inserting data:', (error as Error).message);
//     } finally {
//       setConfirmLoading(false); // Reset loading state
//     }
//   };

//   const onFinishFailed: FormProps<FieldNamesType>['onFinishFailed'] = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <>
//       {/* <Button type="primary" ghost onClick={showModal}>
//         Add to Do
//       </Button> */}
//       <Modal title={titleRender()} open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
//         <Form
//           name="basic"
//           // labelCol={{ span: 8 }}
//           // wrapperCol={{ span: 16 }}
//           // style={{ maxWidth: 600 }}
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item label="제목" name="title" rules={[{ required: true, message: 'Please input your Title!' }]}>
//             <Input onChange={onChange} name="title" value={data.title} />
//           </Form.Item>
//           <Form.Item label="내용" name="content" rules={[{ required: true, message: 'Please input your content!' }]}>
//             <TextArea onChange={onChange} name="content" value={data.content} />
//           </Form.Item>
//           <Form.Item label="기간" name="startDate" rules={[{ required: true, message: 'Please input your Range!' }]}>
//             <RangePicker value={data.period} onChange={handleDateChange} />
//             <Button
//               type={isAllDay ? 'primary' : 'default'}
//               ghost={isAllDay}
//               onClick={() => {
//                 setIsAllDay(!isAllDay);
//               }}
//               style={{ marginLeft: '8px' }}
//             >
//               하루종일
//             </Button>
//           </Form.Item>
//           {!isAllDay && (
//             <Form.Item label="시간" name="TimeRangePicker" rules={[{ required: true, message: 'Please input your Time!' }]}>
//               <TimePicker.RangePicker
//                 format={'HH:mm'}
//                 onChange={handleTimeChange}
//                 // onChange={(dates, dateStrings) => {
//                 //   console.log(dates);
//                 // }}
//               />
//             </Form.Item>
//           )}
//           {/* <CustomTimePicker
//             setTimeRange={(time: any) => {
//               setData((prev) => ({
//                 ...prev,
//                 time: time,
//                 // 사이트 변경 시, 장비 초기화
//                 // ...(name === 'site' && { equipment: '장비를 선택해주세요' }),
//               }));
//             }}
//           /> */}
//           <Form.Item label="우선순위" name="priority" rules={[{ required: true, message: 'Please input your Range!' }]}>
//             <Select
//               // defaultValue="선택"
//               placeholder="선택"
//               style={{ width: 120 }}
//               value={data.priority}
//               onChange={(value: string) => {
//                 setData((prev) => ({
//                   ...prev,
//                   priority: value,
//                 }));
//               }}
//               options={[
//                 { value: 'H', label: '상' },
//                 { value: 'M', label: '중' },
//                 { value: 'L', label: '하' },
//               ]}
//             />
//           </Form.Item>
//           <Form.Item label="상태" name="status" rules={[{ required: true, message: 'Please input your Range!' }]}>
//             <Select
//               // defaultValue="선택"
//               placeholder="선택"
//               style={{ width: 120 }}
//               value={data.status}
//               onChange={(status: string) => {
//                 setData((prev) => ({
//                   ...prev,
//                   status: status,
//                 }));
//               }}
//               options={[
//                 { value: 'before', label: '진행예정' },
//                 { value: 'progress', label: '진행중' },
//                 { value: 'complete', label: '완료' },
//                 { value: 'cancel', label: '보류' },
//               ]}
//             />
//           </Form.Item>
//           <Form.Item label="이벤트 색상" name="color" rules={[{ required: true, message: 'Please input your Color!' }]}>
//             <ColorsPicker>
//               {colorsList.map((color) => (
//                 <ColorChip
//                   key={color}
//                   $bgColor={color}
//                   onClick={() => {
//                     setData((prev) => ({
//                       ...prev,
//                       toDoType: color,
//                     }));
//                   }}
//                 />
//               ))}
//             </ColorsPicker>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// // export interface ToDoItem {
// //   key: number;
// //   title: string;
// //   content: string;
// //   startDate: Dayjs;
// //   endDate: Dayjs;
// //   compDate?: Dayjs | null;
// //   priority: 'H' | 'M' | 'L';
// //   status: 'before' | 'progress' | 'complete' | 'stop' | 'cancel';
// //   toDoType: string;
// // }

// export default WriteModal;

// import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Button, Form, FormProps, Input, message, Modal, Select, TimePicker, DatePicker } from 'antd';
// import { CalendarOutlined } from '@ant-design/icons';
// import dayjs, { Dayjs } from 'dayjs';
// import { supabase } from '@api/supabaseClient';
// import { toDoListStore, userInfoStore } from '@store/store';

// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

// interface WriteModalProps {
//   updateMode?: boolean;
//   todoId?: string;
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }

// const WriteModal = ({ updateMode, todoId, open, setOpen }: WriteModalProps) => {
//   const { setToDoList } = toDoListStore();
//   const { userInfo } = userInfoStore();

//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [isAllDay, setIsAllDay] = useState(false);

//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (updateMode && todoId) {
//       const getToDoItem = async () => {
//         try {
//           const { data: toDoData, error } = await supabase.from('todo').select('*').eq('id', todoId).single();

//           if (error) throw error;

//           if (toDoData) {
//             form.setFieldsValue({
//               title: toDoData.title,
//               content: toDoData.content,
//               period: toDoData.period ? [dayjs(toDoData.period[0]), dayjs(toDoData.period[1])] : [],
//               time: toDoData.time ? [dayjs(toDoData.time[0]), dayjs(toDoData.time[1])] : [],
//               compDate: toDoData.compDate ? dayjs(toDoData.compDate) : null,
//               priority: toDoData.priority,
//               status: toDoData.status,
//               toDoType: toDoData.toDoType,
//             });
//           }
//         } catch (error) {
//           console.error('Error fetching data:', (error as Error).message);
//         }
//       };

//       getToDoItem();
//     }
//   }, [updateMode, todoId, open, form]);

//   const handleOk = async () => {
//     try {
//       setConfirmLoading(true);

//       const values = form.getFieldsValue();

//       const { error } = await supabase.from('todo').upsert([
//         {
//           id: todoId,
//           uid: userInfo?.id,
//           title: values.title,
//           content: values.content,
//           period: values.period,
//           time: values.time,
//           compDate: values.compDate ? values.compDate.toISOString() : null,
//           priority: values.priority,
//           status: values.status,
//           toDoType: values.toDoType,
//         },
//       ]);

//       if (error) throw error;

//       const { data: toDoData } = await supabase.from('todo').select('*');
//       setToDoList(toDoData);

//       message.success(`일정이 ${updateMode ? '수정' : '저장'}되었습니다!`, 0.7);
//     } catch (error) {
//       console.error('Error saving data:', (error as Error).message);
//     } finally {
//       setConfirmLoading(false);
//       setOpen(false);
//       form.resetFields(); // Reset form fields
//     }
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   const titleRender = () => (
//     <TitleWrap>
//       <CalendarOutlined />
//       {updateMode ? '일정 수정' : '일정 추가'}
//     </TitleWrap>
//   );

//   const colorsList = ['#CC73E1', '#EF5350', '#F7ADC3', '#AB47BC', '#6F81E3', '#42A5F5', '#26C6DA', '#90E694', '#97DEB9', '#FCF403', '#FFB241', '#FF7043', '#BDBDBD', '#88BFBF'];

//   return (
//     <Modal title={titleRender()} open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
//       <Form form={form} name="basic" initialValues={{ remember: true }} onFinish={handleOk} autoComplete="off">
//         <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력하세요!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력하세요!' }]}>
//           <TextArea />
//         </Form.Item>
//         <Form.Item label="기간" name="period" rules={[{ required: true, message: '기간을 선택하세요!' }]}>
//           <RangePicker value={form.getFieldValue('period')} />
//           <Button type={isAllDay ? 'primary' : 'default'} ghost={isAllDay} onClick={() => setIsAllDay(!isAllDay)} style={{ marginLeft: '8px' }}>
//             하루종일
//           </Button>
//         </Form.Item>
//         {!isAllDay && (
//           <Form.Item label="시간" name="time" rules={[{ required: true, message: '시간을 선택하세요!' }]}>
//             <TimePicker.RangePicker format={'HH:mm'} />
//           </Form.Item>
//         )}
//         {updateMode && (
//           <Form.Item label="완료일" name="compDate" rules={[{ message: '종료일을 선택하세요!' }]}>
//             <DatePicker />
//           </Form.Item>
//         )}
//         <Form.Item label="우선순위" name="priority" rules={[{ required: true, message: '우선순위를 선택하세요!' }]}>
//           <Select placeholder="선택">
//             <Select.Option value="H">상</Select.Option>
//             <Select.Option value="M">중</Select.Option>
//             <Select.Option value="L">하</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item label="상태" name="status" rules={[{ required: true, message: '상태를 선택하세요!' }]}>
//           <Select placeholder="선택">
//             <Select.Option value="before">진행예정</Select.Option>
//             <Select.Option value="progress">진행중</Select.Option>
//             <Select.Option value="complete">완료</Select.Option>
//             <Select.Option value="cancel">보류</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item label="이벤트 색상" name="toDoType" rules={[{ required: true, message: '색상을 선택하세요!' }]}>
//           <ColorsPicker>
//             {colorsList.map((color) => (
//               <ColorChip key={color} $bgColor={color} onClick={() => form.setFieldsValue({ toDoType: color })} />
//             ))}
//           </ColorsPicker>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default WriteModal;

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, message, Modal, Select, TimePicker, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { supabase } from '@api/supabaseClient';
import { toDoListStore, userInfoStore } from '@store/store';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface WriteModalProps {
  updateMode?: boolean;
  todoId?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const WriteModal = ({ updateMode, todoId, open, setOpen }: WriteModalProps) => {
  const { setToDoList } = toDoListStore();
  const { userInfo } = userInfoStore();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (updateMode && todoId) {
      const getToDoItem = async () => {
        try {
          const { data: toDoData, error } = await supabase.from('todo').select('*').eq('id', todoId).single();

          if (error) throw error;

          if (toDoData) {
            form.setFieldsValue({
              title: toDoData.title,
              content: toDoData.content,
              period: toDoData.period ? [dayjs(toDoData.period[0]), dayjs(toDoData.period[1])] : [],
              time: toDoData.time ? [dayjs(toDoData.time[0]), dayjs(toDoData.time[1])] : [],
              compDate: toDoData.compDate ? dayjs(toDoData.compDate) : null,
              priority: toDoData.priority,
              status: toDoData.status,
              toDoType: toDoData.toDoType,
            });
          }
        } catch (error) {
          console.error('Error fetching data:', (error as Error).message);
        }
      };

      getToDoItem();
    } else {
      // 초기화
      form.resetFields();
    }
  }, [updateMode, todoId, open, form]);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);

      const values = form.getFieldsValue();
      const compDate = values.compDate ? values.compDate.toISOString() : null;

      // 조건에 따라 id를 지정합니다.
      const itemToInsert = {
        uid: userInfo?.id,
        title: values.title,
        content: values.content,
        period: values.period,
        time: values.time,
        compDate,
        priority: values.priority,
        status: values.status,
        toDoType: values.toDoType,
      };

      // 수정 모드인 경우 id를 추가합니다.
      if (updateMode && todoId) {
        itemToInsert.id = todoId;
      }

      const { error } = await supabase.from('todo').upsert([itemToInsert]);

      if (error) throw error;

      const { data: toDoData } = await supabase.from('todo').select('*');
      setToDoList(toDoData);

      message.success(`일정이 ${updateMode ? '수정' : '저장'}되었습니다!`, 0.7);
    } catch (error) {
      console.error('Error saving data:', (error as Error).message);
    } finally {
      setConfirmLoading(false);
      setOpen(false);
      form.resetFields(); // 폼 필드 초기화
    }
  };

  // const handleOk = async () => {
  //   try {
  //     setConfirmLoading(true);

  //     const values = form.getFieldsValue();
  //     const compDate = values.compDate ? values.compDate.toISOString() : null;

  //     const { error } = await supabase.from('todo').upsert([
  //       {
  //         id: todoId || undefined, // 새로 작성할 경우 id는 undefined
  //         uid: userInfo?.id,
  //         title: values.title,
  //         content: values.content,
  //         period: values.period,
  //         time: values.time,
  //         compDate,
  //         priority: values.priority,
  //         status: values.status,
  //         toDoType: values.toDoType,
  //       },
  //     ]);

  //     if (error) throw error;

  //     const { data: toDoData } = await supabase.from('todo').select('*');
  //     setToDoList(toDoData);

  //     message.success(`일정이 ${updateMode ? '수정' : '저장'}되었습니다!`, 0.7);
  //   } catch (error) {
  //     console.error('Error saving data:', (error as Error).message);
  //   } finally {
  //     setConfirmLoading(false);
  //     setOpen(false);
  //   }
  // };

  const handleCancel = () => {
    setOpen(false);
  };

  const titleRender = () => (
    <TitleWrap>
      <CalendarOutlined />
      {updateMode ? '일정 수정' : '일정 추가'}
    </TitleWrap>
  );

  const colorsList = ['#CC73E1', '#EF5350', '#F7ADC3', '#AB47BC', '#6F81E3', '#42A5F5', '#26C6DA', '#90E694', '#97DEB9', '#FCF403', '#FFB241', '#FF7043', '#BDBDBD', '#88BFBF'];

  return (
    <Modal title={titleRender()} open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <Form form={form} name="basic" initialValues={{ remember: true }} onFinish={handleOk} autoComplete="off">
        <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력하세요!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력하세요!' }]}>
          <TextArea />
        </Form.Item>
        <Form.Item label="기간" name="period" rules={[{ required: true, message: '기간을 선택하세요!' }]}>
          <RangePicker />
          <Button type={isAllDay ? 'primary' : 'default'} ghost={isAllDay} onClick={() => setIsAllDay(!isAllDay)} style={{ marginLeft: '8px' }}>
            하루종일
          </Button>
        </Form.Item>
        {!isAllDay && (
          <Form.Item label="시간" name="time" rules={[{ required: true, message: '시간을 선택하세요!' }]}>
            <TimePicker.RangePicker format={'HH:mm'} />
          </Form.Item>
        )}
        {updateMode && (
          <Form.Item label="완료일" name="compDate" rules={[{ message: '종료일을 선택하세요!' }]}>
            <DatePicker />
          </Form.Item>
        )}
        <Form.Item label="우선순위" name="priority" rules={[{ required: true, message: '우선순위를 선택하세요!' }]}>
          <Select placeholder="선택">
            <Select.Option value="H">상</Select.Option>
            <Select.Option value="M">중</Select.Option>
            <Select.Option value="L">하</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="상태" name="status" rules={[{ required: true, message: '상태를 선택하세요!' }]}>
          <Select placeholder="선택">
            <Select.Option value="before">진행예정</Select.Option>
            <Select.Option value="progress">진행중</Select.Option>
            <Select.Option value="complete">완료</Select.Option>
            <Select.Option value="cancel">보류</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="이벤트 색상" name="toDoType" rules={[{ required: true, message: '색상을 선택하세요!' }]}>
          <ColorsPicker>
            {colorsList.map((color) => (
              <ColorChip key={color} $bgColor={color} onClick={() => form.setFieldsValue({ toDoType: color })} />
            ))}
          </ColorsPicker>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WriteModal;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ColorsPicker = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
// const ColorChip = styled.div<{ bgColor: string; onClick: (color: string) => void }>`
const ColorChip = styled.div<{ $bgColor: string; onClick: () => void }>`
  background-color: ${({ $bgColor }) => $bgColor};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    border: 3px solid ${({ $bgColor }) => $bgColor};
    opacity: 0;
    transition: border 0.4s;
  }

  &:hover {
    &::before {
      opacity: 0.3;
    }
  }
`;
