'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { hitProtected } from '../api/hitProtected';

const ProtectedForm = () => {
    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqBody = {
            testBody: 'test',
        };

        try {
            await hitProtected(accessToken);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <pre>{accessToken}</pre>
            <button type="button" onClick={handleSubmit}>
                Protected
            </button>
        </div>
    );
};

export default ProtectedForm;
