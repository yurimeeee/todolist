import styled from 'styled-components';
import koKR from 'antd/es/locale/ko_KR';

import { Calendar, Badge, ConfigProvider } from 'antd';
import { Todo } from 'src/types/type';
import { detailModalStore } from '@store/store';

interface CustomCalendarProps {
  data: Todo[];
}

const CustomCalendar = ({ data }: CustomCalendarProps) => {
  const { setIsDetailOpen, setDetailId } = detailModalStore();

  const isDateInPeriod = (date: any, start: any, end: any) => {
    const dateObj = new Date(date);
    const startObj = new Date(start);
    const endObj = new Date(end);
    return dateObj >= startObj && dateObj <= endObj;
  };

  const getListData = (value: any) => {
    const dateString = value.format('YYYY-MM-DD');
    return data?.filter((item) => item.status !== 'cancel')?.filter((item) => isDateInPeriod(dateString, item.period[0], item.period[1]));
  };

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData?.slice(0, 3).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setDetailId(item.id);
              setIsDetailOpen(true);
            }}
            style={{ fontSize: '10px' }}
          >
            <Badge color={item.toDoType} text={item.title} title={item.title} />
          </div>
        ))}
      </ul>
    );
  };

  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        components: {
          Calendar: {
            itemActiveBg: '#fafdff',
          },
        },
        token: { controlItemBgHover: '#fafdffb6' },
      }}
    >
      <Wrap>
        <Calendar dateCellRender={dateCellRender} mode={'month'} />
      </Wrap>
    </ConfigProvider>
  );
};

export default CustomCalendar;

const Wrap = styled.div`
  width: 100%;

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0 !important;
    unicode-bidi: isolate;
  }

  .events {
    width: 100%;
    max-width: 96px;
  }
  .events span {
    width: 100%;
    font-size: 12px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-radio-group {
    display: none;
  }
`;
