'use client';

import React from 'react';
import { createRecord } from '../api/createRecord';
import { getIsoString, getTime } from '../utils/utils';

const NappyForm = () => {
    const table = 'nappy';
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nappyContents = e.target.innerText.toLowerCase();

            const isoDate = getIsoString(getTime());
            const eventBody = {
                type: nappyContents,
                time: `${isoDate}`,
            };
            await createRecord(table, eventBody);
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
