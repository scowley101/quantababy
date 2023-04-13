// components/SleepForm.js
import React from 'react';

const SleepForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Get subission time
        const timeStamp = Date.now();
        const date = new Date(timeStamp);
        const isoDate = date.toISOString();
        const sleepBody = {
        time_stamp: timeStamp,
        start_time: `${isoDate}`,
        };
        console.log(sleepBody);
        // Submit form
        const res = await fetch('/api/sleep/new', {
        method: 'post',
        body: JSON.stringify(sleepBody),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        });
        console.log('response: ', res);
    
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
