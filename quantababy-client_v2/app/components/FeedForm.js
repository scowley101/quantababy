'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { createRecord } from '../api/createRecord';
import useEventTracker from '../hooks/useEventTracker';
import { msToFormattedString } from '../utils/utils';
import { updateRecord } from '../api/updateRecord';

const FeedForm = () => {
    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    const userId = session?.userId;
    const table = 'feed';
    const { isTracking, handleStart, handleEnd, timer, lastEventInfo } =
        useEventTracker(userId, accessToken, table, createRecord, updateRecord);

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
