import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const Test = () => {
  const [startDate, setStartDate] = useState(new Date());

  const onChangeDate = useCallback(
    date => {
      setStartDate(date);
    },
    [startDate]
  );

  return <DatePicker selected={startDate} onChange={onChangeDate} />;
};

export default Test;
