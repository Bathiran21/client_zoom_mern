import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveMeeting = ({ accessToken }) => {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      setError('Missing access token');
      setLoading(false);
      return;
    }

    const fetchActiveMeeting = async () => {
      try {
        const res = await axios.get('https://api.zoom.us/v2/users/me/meetings?type=live', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.data.meetings && res.data.meetings.length > 0) {
          setMeeting(res.data.meetings[0]);
        } else {
          setMeeting(null);
        }
      } catch (err) {
        console.error('Error fetching active meeting:', err);
        setError('Failed to fetch active meeting');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveMeeting();
  }, [accessToken]);

  if (loading) return <p>Loading active meeting...</p>;
  if (error) return <h4 className='text-center mt-5'>No Active Meeting</h4>;

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">🟢 Active Meeting</h2>
      {meeting ? (
        <div>
          <p><strong>Topic:</strong> {meeting.topic}</p>
          <p><strong>Meeting ID:</strong> {meeting.id}</p>
          <p><strong>Start Time:</strong> {new Date(meeting.start_time).toLocaleString()}</p>
          <p>
            <strong>Join URL:</strong>{' '}
            <a href={meeting.join_url} className="text-blue-500 underline" target="_blank" rel="noreferrer">
              {meeting.join_url}
            </a>
          </p>
        </div>
      ) : (
        <p>No active meeting at the moment.</p>
      )}
    </div>
  );
};

export default ActiveMeeting;
