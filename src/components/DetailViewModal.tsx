import React, { Dispatch, SetStateAction, useState } from 'react';
import { Badge, Button, Modal, Rate } from 'antd';
import { Todo } from 'src/types/type';
import styled from 'styled-components';
import { TagsOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { renderDday, statusFormatter } from '../utils/functions';
import { modalStore } from '@store/store';

interface DetailViewModalProps {
  data: Todo | null;
  todoId?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function DetailViewModal({ data, todoId, open, setOpen }: DetailViewModalProps) {
  const { setIsOpen, setToDoId, setIsUpateMode } = modalStore();
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
        <Wrap>
          <Row>일정 : {data?.title || ''}</Row>
          <Row>내용 : {data?.content || ''}</Row>
          <Row>시작일 : {dayjs(data?.period[0]).format('YYYY-MM-DD') || ''}</Row>
          <Row>종료일 : {dayjs(data?.period[1]).format('YYYY-MM-DD') || ''}</Row>
          {data?.compDate && <Row>완료일 : {dayjs(data?.compDate).format('YYYY-MM-DD') || ''}</Row>}
          {data?.time[0] !== null && data?.time[1] !== null && <Row>시간 : {`${data?.time[0] || ''} - ${data?.time[1] || ''}`}</Row>}
          <Row>진행 상태 : {statusFormatter(data?.status)}</Row>
          <Row>
            중요도 : <Rate count={3} disabled defaultValue={data?.priority === 'H' ? 3 : data?.priority === 'M' ? 2 : data?.priority === 'L' ? 1 : 0} />
          </Row>
        </Wrap>
        <ButtonWrap>
          <Button
            type="link"
            ghost
            onClick={() => {
              setIsOpen(true);
              setIsUpateMode(true);
              setToDoId(todoId);
              handleCancel();
            }}
          >
            수정
          </Button>
          <Button type="link" danger>
            삭제
          </Button>
          {/* <Button type="primary" ghost>
            수정
          </Button>
          <Button danger>삭제</Button> */}
        </ButtonWrap>
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
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;

  .ant-btn {
    padding: 4px;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
`;
