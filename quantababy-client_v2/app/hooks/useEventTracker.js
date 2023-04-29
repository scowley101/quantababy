// hooks/useEventTracker.js
import { useState, useEffect } from 'react';
import { getIsoString, getTime, msToFormattedString } from '../utils/utils';

const useEventTracker = (
    token,
    table,
    createEventRecord,
    updateEventRecord
) => {
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
        const ended = new Date();
        setEndTime(ended);
    };

    useEffect(() => {
        if (startTime) {
            setIsTracking(true);
            const eventBody = {
                start_time: `${getIsoString(startTime)}`,
            };

            const createRecordAndUpdateId = async () => {
                console.log(
                    'the params going into createRecord is:',
                    table,
                    token,
                    eventBody
                );
                const id = await createEventRecord(table, token, eventBody);
                console.log('id is:', id);
                setRecordId(id);
            };
            createRecordAndUpdateId();
        }
    }, [startTime, createEventRecord, table, token]);

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
            updateEventRecord(table, token, recordId, eventBody);
        }
    }, [
        endTime,
        startTime,
        isTracking,
        recordId,
        updateEventRecord,
        table,
        token,
    ]);

    return {
        isTracking,
        handleStart,
        handleEnd,
        timer,
        lastEventInfo,
    };
};

export default useEventTracker;
