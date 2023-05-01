'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { createRecord } from '../api/createRecord';
import { getIsoString, getTime } from '../utils/utils';

const NappyForm = () => {
    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    const userId = session?.userId;
    const table = 'nappy';
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nappyContents = e.target.innerText.toLowerCase();

            const isoDate = getIsoString(getTime());
            const eventBody = {
                type: nappyContents,
                time: `${isoDate}`,
                user_id: userId,
            };
            await createRecord(accessToken, table, eventBody);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button type="button" onClick={handleSubmit}>
                Wet
            </button>
            <button type="button" onClick={handleSubmit}>
                Dirty
            </button>
        </div>
    );
};

export default NappyForm;
