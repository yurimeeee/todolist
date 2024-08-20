import React, { Dispatch, SetStateAction, useState } from 'react';
import { Badge, Button, Modal, Rate } from 'antd';
import { Todo } from 'src/types/type';
import styled from 'styled-components';
import { TagsOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { renderDday, statusFormatter } from '../utils/functions';

interface DetailViewModalProps {
  data: Todo | null;
  todoId?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function DetailViewModal({ data, todoId, open, setOpen }: DetailViewModalProps) {
  const titleRender = (date: any) => (
    <TitleWrap>
      <Title>
        <TagsOutlined />
        상세보기
      </Title>
      <Badge count={renderDday(date)} showZero color="#a7c3eb" />
    </TitleWrap>
  );

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal title={titleRender(data?.period[1])} open={open} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <p>{data?.title || ''}</p>
        <p>{data?.content || ''}</p>
        <p>시작일 : {dayjs(data?.period[0]).format('YYYY-MM-DD') || ''}</p>
        <p>종료일 : {dayjs(data?.period[1]).format('YYYY-MM-DD') || ''}</p>
        {data?.compDate && <p>완료일 : {data?.compDate || ''}</p>}
        {data?.time[0] !== null && data?.time[1] !== null && <p>시간 : {`${data?.time[0] || ''} - ${data?.time[1] || ''}`}</p>}
        <p>진행 상태 : {statusFormatter(data?.status)}</p>
        <p>
          중요도 : <Rate count={3} disabled defaultValue={data?.priority === 'H' ? 3 : data?.priority === 'M' ? 2 : data?.priority === 'L' ? 1 : 0} />
        </p>
      </Modal>
    </>
  );
}

export default DetailViewModal;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 40px;
  gap: 10px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
