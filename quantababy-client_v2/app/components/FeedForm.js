'use client';

import React from 'react';
import { createRecord } from '../api/createRecord';
import useEventTracker from '../hooks/useEventTracker';
import { msToFormattedString } from '../utils/utils';
import { updateRecord } from '../api/updateRecord';

const FeedForm = ({ user: { id } }) => {
    const userId = id;
    console.log('userID in FeedForm is:', userId);

    const table = 'feed';
    const { isTracking, handleStart, handleEnd, timer, lastEventInfo } =
        useEventTracker(userId, table, createRecord, updateRecord);

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                {isTracking ? (
                    <button type="button" onClick={handleEnd}>
                        Unlatch
                    </button>
                ) : (
                    <button type="button" onClick={handleStart}>
                        Feed
                    </button>
                )}
            </form>
            {isTracking && <div>Timer: {msToFormattedString(timer)}</div>}
            {!isTracking && lastEventInfo && (
                <div>
                    Last feed ended at {lastEventInfo?.endedAt} and lasted{' '}
                    {lastEventInfo?.duration}
                </div>
            )}
        </div>
    );
};

export default FeedForm;
