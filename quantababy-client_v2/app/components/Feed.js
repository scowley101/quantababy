import React from 'react';
import FeedForm from './FeedForm';

function Feed({ user }) {
    return (
        <div>
            <h2>Feed</h2>
            <FeedForm user={user} />
        </div>
    );
}

export default Feed;
