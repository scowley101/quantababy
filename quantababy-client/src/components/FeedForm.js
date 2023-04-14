import React from 'react';
import { createRecord } from './api/createRecord';
import useEventTracker from '@/hooks/useEventTracker';
import { msToFormattedString } from '@/utils/utils';
import { updateRecord } from './api/updateRecord';

const FeedForm = () => {
    const table = 'feed';
  const { isTracking, handleStart, handleEnd, timer, lastEventInfo } = useEventTracker(
    table,
    createRecord,
    updateRecord
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {isTracking ? (
          <button onClick={handleEnd}>Satiated</button>
        ) : (
          <button  onClick={handleStart}>Feeding</button>
        )}
      </form>
      {isTracking && <div>Timer: {msToFormattedString(timer)}</div>}
      {!isTracking && lastEventInfo && (
        <div>
          Last feed ended at {lastEventInfo?.endedAt} and lasted {lastEventInfo?.duration}
        </div>
      )}
    </div>
  );
};

export default FeedForm;
