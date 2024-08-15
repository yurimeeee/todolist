import React, { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

interface CustomTimePickerProps {
  setTimeRange: (time: [Dayjs | null, Dayjs | null]) => void;
}

function CustomTimePicker({ setTimeRange }: CustomTimePickerProps) {
  // const [timeRange, setTimeRange] = useState<string | null>(null);

  // const handleRangeChange = (times: [Dayjs | null, Dayjs | null]) => {
  const handleRangeChange = (times: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
    if (times?.[0] && times?.[1]) {
      const formattedStartTime = times[0].format('HH:mm');
      const formattedEndTime = times[1].format('HH:mm');
      // setTimeRange(`${formattedStartTime} - ${formattedEndTime}`);
    } else {
      // setTimeRange(null);
    }
  };

  return (
    <div>
      <TimePicker.RangePicker onChange={handleRangeChange} format="HH:mm" />
    </div>
  );
}

export default CustomTimePicker;
