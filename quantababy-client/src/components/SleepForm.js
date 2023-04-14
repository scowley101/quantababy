import React, { useState, useEffect } from 'react';
import { createSleepRecord } from './api/sleep';
import { getIsoString, getTime, msToFormattedString } from '@/utils/utils';

const SleepForm = () => {
  const [isSleeping, setIsSleeping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [lastSleepInfo, setLastSleepInfo] = useState(null);



const handleSleep = () => {
  const currentTime = getTime();
  setStartTime(currentTime);
  setTimerId(setInterval(() => {
    setTimer((prevTimer) => prevTimer + 1000);
  }, 1000));
  setTimer(0); // Reset the timer to 0 before starting
};

useEffect(() => {
  if (startTime) {
    setIsSleeping(true);
    const sleepBody = {
      time_stamp: startTime,
      start_time: `${getIsoString(startTime)}`
    };
    const createNewSleepRecord = async () => {
      try {
        const response = await createSleepRecord(sleepBody);
        console.log('response: ', response);
      } catch (err) {
        console.error(err);
      }
    };
    createNewSleepRecord();
  }
}, [startTime]);


const handleWake = () => {
  setIsSleeping(false);
  clearInterval(timerId);
  const endTime = new Date();
  setEndTime(endTime);
};

useEffect(() => {
  if (endTime && startTime && !isSleeping) {
    const duration = endTime.getTime() - startTime;
    setLastSleepInfo({
      endedAt: endTime.toLocaleTimeString(),
      duration: msToFormattedString(duration),
    });
  }
}, [endTime, isSleeping]);

  

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {isSleeping ? (
          <button onClick={handleWake}>Wake</button>
        ) : (
          <button onClick={handleSleep}>Sleep</button>
        )}
      </form>
      {isSleeping && <div>Timer: {msToFormattedString(timer)}</div>}
      {!isSleeping && lastSleepInfo && (
        <div>
          Last sleep ended at {lastSleepInfo?.endedAt} and lasted {lastSleepInfo?.duration}
        </div>
      )}
    </div>
  );
};

export default SleepForm;
