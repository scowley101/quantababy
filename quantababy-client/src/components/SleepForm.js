// components/SleepForm.js
import React from 'react';
import { createSleepRecord } from './api/sleep';
import useEventTracker from '@/hooks/useEventTracker';
import { msToFormattedString } from '@/utils/utils';

const SleepForm = () => {
  const { isTracking, handleStart, handleEnd, timer, lastEventInfo } = useEventTracker(
    createSleepRecord
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {isTracking ? (
          <button onClick={handleEnd}>Wake</button>
        ) : (
          <button onClick={handleStart}>Sleep</button>
        )}
      </form>
      {isTracking && <div>Timer: {msToFormattedString(timer)}</div>}
      {!isTracking && lastEventInfo && (
        <div>
          Last sleep ended at {lastEventInfo?.endedAt} and lasted {lastEventInfo?.duration}
        </div>
      )}
    </div>
  );
};

export default SleepForm;
