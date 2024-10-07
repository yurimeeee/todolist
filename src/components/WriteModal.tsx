import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Flex, Form, FormProps, Input, message, Modal, Select, TimePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { supabase } from '@api/supabaseClient';
import { Dayjs } from 'dayjs';
import CustomTimePicker from './CustomTimePicker';
import dayjs from 'dayjs';
import { toDoListStore, userInfoStore } from '@store/store';
import { Todo } from '../types/type';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface WriteModalProps {
  updateMode?: boolean;
  todoId?: string | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // onChange: (key: string) => void;
}

const WriteModal = ({ updateMode, todoId, open, setOpen }: WriteModalProps) => {
  const { setToDoList } = toDoListStore();
  const { userInfo } = userInfoStore();

  const [form] = Form.useForm(); // Correctly get the form instance
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  const [data, setData] = useState({
    title: '',
    content: '',
    period: [null, null] as [Dayjs | null, Dayjs | null],
    time: [null, null] as [Dayjs | null, Dayjs | null],
    compDate: null as Dayjs | null,
    priority: '',
    status: '',
    toDoType: '',
  });

  const getToDoItem = async () => {
    if (updateMode && todoId) {
      try {
        const { data: toDoData } = await supabase.from('todo').select('*').eq('id', todoId).single();
        if (toDoData) {
          const formattedData = {
            title: toDoData.title,
            content: toDoData.content,
            period: [toDoData.period ? dayjs(toDoData.period[0]) : null, toDoData.period ? dayjs(toDoData.period[1]) : null] as [Dayjs | null, Dayjs | null],
            time: [toDoData.time ? dayjs(toDoData.time[0]) : null, toDoData.time ? dayjs(toDoData.time[1]) : null] as [Dayjs | null, Dayjs | null],
            compDate: toDoData.compDate ? dayjs(toDoData.compDate) : null,
            priority: toDoData.priority,
            status: toDoData.status,
            toDoType: toDoData.toDoType,
          };
          setData(formattedData);
          form.setFieldsValue(formattedData); // Populate the form fields
          setSelectedColor(toDoData.toDoType);
        }
      } catch (error) {
        console.error('Error getToDoItem data:', (error as Error).message);
      }
    }
  };

  useEffect(() => {
    if (updateMode && todoId) {
      getToDoItem();
    }
  }, [open]);

  const handleOk = async () => {
    if (!data.title) {
      message.error('제목을 입력해주세요.');
      return;
    }

    if (!data.content) {
      message.error('내용을 입력해주세요.');
      return;
    }

    if (!data.period || !data.period[0] || !data.period[1]) {
      message.error('기간을 설정해주세요.');
      return;
    }

    try {
      setConfirmLoading(true);
      const payload = {
        uid: userInfo?.id,
        title: data.title,
        content: data.content,
        period: data.period,
        time: data.time,
        compDate: data?.compDate,
        priority: data.priority,
        status: data.status,
        toDoType: data.toDoType,
      };

      if (updateMode && todoId) {
        const { error } = await supabase.from('todo').update(payload).eq('id', todoId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('todo').insert([payload]);
        if (error) throw error;
      }

      const { data: toDoData } = await supabase.from('todo').select('*');
      setToDoList(toDoData);
      message.success(updateMode ? '일정이 수정되었습니다!' : '일정이 등록되었습니다!', 0.7);
    } catch (error) {
      console.error('Error inserting data:', (error as Error).message);
    } finally {
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 1000);
      setData({
        title: '',
        content: '',
        period: [null, null] as [Dayjs | null, Dayjs | null],
        time: [null, null] as [Dayjs | null, Dayjs | null],
        compDate: null,
        priority: '',
        status: '',
        toDoType: '',
      });
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const titleRender = () => (
    <Flex align="center" gap={10}>
      <CalendarOutlined />
      {updateMode ? '일정 수정' : '일정 추가'}
    </Flex>
  );

  const colorsList = ['#CC73E1', '#EF5350', '#F7ADC3', '#AB47BC', '#6F81E3', '#42A5F5', '#26C6DA', '#90E694', '#97DEB9', '#FCF403', '#FFB241', '#FF7043', '#BDBDBD', '#88BFBF'];

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
      const { name, value } = e.target;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [data]
  );

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
    if (dates) {
      setData((prev) => ({
        ...prev,
        period: dates as [Dayjs | null, Dayjs | null], // Ensure it's a tuple
      }));
    }
  };

  // const handleTimeChange = (times: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
  //   if (times) {
  //     setData((prev) => ({
  //       ...prev,
  //       time: times as [Dayjs | null, Dayjs | null], // Ensure it's a tuple
  //     }));
  //   }
  // };
  const handleTimeChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
    if (dates) {
      setData((prevData) => ({
        ...prevData,
        time: dates,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        time: [null, null],
      }));
    }
  };

  const onFinish = async (values: any) => {
    handleOk();
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {/* <Button type="primary" ghost onClick={showModal}>
        Add to Do
      </Button> */}
      <Modal title={titleRender()} open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <Form
          name="basic"
          form={form}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="제목" name="title" rules={[{ required: true, message: 'Please input your Title!' }]}>
            <Input onChange={onChange} name="title" value={data.title} />
          </Form.Item>
          <Form.Item label="내용" name="content" rules={[{ required: true, message: 'Please input your content!' }]}>
            <TextArea onChange={onChange} name="content" value={data.content} />
          </Form.Item>
          <Form.Item label="기간" name="startDate" rules={[{ required: true, message: 'Please input your Range!' }]}>
            <RangePicker value={data.period} onChange={handleDateChange} placeholder={['시작일', '종료일']} />
            <Button
              type={isAllDay ? 'primary' : 'default'}
              ghost={isAllDay}
              onClick={() => {
                setIsAllDay(!isAllDay);
                setData((prev) => ({
                  ...prev,
                  time: [null, null],
                }));
              }}
              style={{ marginLeft: '8px' }}
            >
              하루종일
            </Button>
          </Form.Item>
          {!isAllDay ||
            (updateMode && data.time && (
              // && data.time[0] !== null && data.time[1] !== null
              <Form.Item label="시간" name="time" rules={[{ required: true, message: 'Please input your Time!' }]}>
                <TimePicker.RangePicker
                  format={'HH:mm'}
                  onChange={handleTimeChange}
                  value={data.time}
                  // value={[null, null]}
                />
              </Form.Item>
            ))}
          {updateMode && (
            <Form.Item label="완료일" name="compDate" rules={[{ required: true, message: 'Please input your Complete Date!' }]}>
              <DatePicker
                // onChange={handleTimeChange}
                value={data.compDate}
                onChange={(dates, dateStrings) => {
                  setData((prev) => ({
                    ...prev,
                    compDate: dates,
                  }));
                }}
              />
            </Form.Item>
          )}
          <Form.Item label="중요도" name="priority" rules={[{ required: true, message: 'Please input your Range!' }]}>
            <Select
              placeholder="선택"
              style={{ width: 120 }}
              value={data.priority}
              onChange={(value: string) => {
                setData((prev) => ({
                  ...prev,
                  priority: value,
                }));
              }}
              options={[
                { value: 'H', label: '상' },
                { value: 'M', label: '중' },
                { value: 'L', label: '하' },
              ]}
            />
          </Form.Item>
          <Form.Item label="상태" name="status" rules={[{ required: true, message: 'Please input your Range!' }]}>
            <Select
              // defaultValue="선택"
              placeholder="선택"
              style={{ width: 120 }}
              value={data.status}
              onChange={(status: string) => {
                setData((prev) => ({
                  ...prev,
                  status: status,
                }));
              }}
              options={[
                { value: 'before', label: '진행예정' },
                { value: 'progress', label: '진행중' },
                { value: 'complete', label: '완료' },
                { value: 'cancel', label: '보류' },
              ]}
            />
          </Form.Item>
          <Form.Item label="이벤트 색상" name="color" rules={[{ required: true, message: 'Please input your Color!' }]}>
            <ColorsPicker>
              {colorsList.map((color) => (
                <ColorChip
                  key={color}
                  $bgColor={color}
                  $isActive={selectedColor === color}
                  onClick={() => {
                    setData((prev) => ({
                      ...prev,
                      toDoType: color,
                    }));
                    setSelectedColor(color);
                  }}
                />
              ))}
            </ColorsPicker>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// export interface ToDoItem {
//   key: number;
//   title: string;
//   content: string;
//   startDate: Dayjs;
//   endDate: Dayjs;
//   compDate?: Dayjs | null;
//   priority: 'H' | 'M' | 'L';
//   status: 'before' | 'progress' | 'complete' | 'stop' | 'cancel';
//   toDoType: string;
// }

export default WriteModal;

const ColorsPicker = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
const ColorChip = styled.div<{ $bgColor: string; $isActive?: boolean; onClick: () => void }>`
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
    opacity: ${({ $isActive }) => ($isActive ? 0.3 : 0)};
    transition: border 0.4s;
  }

  &:hover {
    &::before {
      opacity: 0.3;
    }
  }
`;
