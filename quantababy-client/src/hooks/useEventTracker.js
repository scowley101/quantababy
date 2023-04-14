// hooks/useEventTracker.js
import { useState, useEffect } from 'react';
import { getIsoString, getTime, msToFormattedString } from '@/utils/utils';
import { updateRecord } from '@/components/api/updateRecord';

const useEventTracker = (table, createEventRecord) => {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [lastEventInfo, setLastEventInfo] = useState(null);
const [recordId, setRecordId] = useState(null);

  const handleStart = () => {
    const currentTime = getTime();
    setStartTime(currentTime);
    setTimerId(
      setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1000);
      }, 1000)
    );
    setTimer(0);
  };

  const handleEnd = () => {
    setIsTracking(false);
    clearInterval(timerId);
    const endTime = new Date();
    setEndTime(endTime);
  };

  useEffect(() => {
    if (startTime) {
      setIsTracking(true);
      const eventBody = {
        start_time: `${getIsoString(startTime)}`,
      };

      const createRecordAndUpdateId = async () => {
        const id = await createEventRecord(table, eventBody);
        setRecordId(id);
    };
    createRecordAndUpdateId();
}
  }, [startTime, createEventRecord]);

  useEffect(() => {
    if (endTime && startTime && !isTracking) {
        const eventBody = {
            finish_time: `${getIsoString(endTime)}`,
          };
    
      const duration = endTime.getTime() - startTime;
      setLastEventInfo({
        endedAt: endTime.toLocaleTimeString(),
        duration: msToFormattedString(duration),
      });
      updateRecord(table, recordId, eventBody);
    }
  }, [endTime, startTime, isTracking]);

  return {
    isTracking,
    handleStart,
    handleEnd,
    timer,
    lastEventInfo,
  };
};

export default useEventTracker;
