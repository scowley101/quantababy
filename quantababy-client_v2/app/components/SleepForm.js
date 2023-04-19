'use client';

import React from 'react';
import { createRecord } from '../api/createRecord';
import useEventTracker from '../hooks/useEventTracker';
import { msToFormattedString } from '../utils/utils';
import { updateRecord } from '../api/updateRecord';

const SleepForm = () => {
    const table = 'sleep';
    const { isTracking, handleStart, handleEnd, timer, lastEventInfo } =
        useEventTracker(table, createRecord, updateRecord);

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                {isTracking ? (
                    <button type="button" onClick={handleEnd}>
                        Wake
                    </button>
                ) : (
                    <button type="button" onClick={handleStart}>
                        Sleep
                    </button>
                )}
            </form>
            {isTracking && <div>Timer: {msToFormattedString(timer)}</div>}
            {!isTracking && lastEventInfo && (
                <div>
                    Last sleep ended at {lastEventInfo?.endedAt} and lasted{' '}
                    {lastEventInfo?.duration}
                </div>
            )}
        </div>
    );
};

export default SleepForm;
