// components/SleepForm.js
import React from 'react';
import { createSleepRecord } from './api/sleep';

const SleepForm = () => {
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timeStamp = Date.now();
      const date = new Date(timeStamp);
      const isoDate = date.toISOString();
      const sleepBody = {
        time_stamp: timeStamp,
        start_time: `${isoDate}`,
      };
      console.log(sleepBody);

      const response = await createSleepRecord(sleepBody);
      console.log('response: ', response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sleep</button>
    </form>
  );
};

export default SleepForm;
