import { useState } from 'react';
import { format } from 'date-fns';

function UpcomingMeetings() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Project Kickoff',
      datetime: '2025-04-23T13:00',
      link: 'https://zoom.us/j/123456789',
    },
    {
      id: 2,
      title: 'Team Sync',
      datetime: '2025-04-24T10:30',
      link: 'https://zoom.us/j/987654321',
    },
  ]);

  const handleStart = (link) => {
    window.open(link, '_blank');
  };

  const handleEdit = (id) => {
    console.log('Edit meeting', id);
    // Could navigate to /edit/:id or open modal
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this meeting?');
    if (confirmDelete) {
      setMeetings(meetings.filter(meeting => meeting.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Upcoming Meetings</h2>

      {meetings.length === 0 ? (
        <p>No upcoming meetings scheduled.</p>
      ) : (
        <ul className="list-group">
          {meetings.map(meeting => (
            <li key={meeting.id} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 shadow-sm rounded">
              <div className="mb-2 mb-md-0">
                <div className="fw-bold text-primary">{format(new Date(meeting.datetime), 'MMM d')}</div>
                <div>{meeting.title}</div>
                <div>{format(new Date(meeting.datetime), 'PPpp')}</div>
                <div><a href={meeting.link} target="_blank" rel="noreferrer">{meeting.link}</a></div>
              </div>
              <div className="d-flex gap-2 mt-2 mt-md-0">
                <button className="btn btn-success" onClick={() => handleStart(meeting.link)}>Start</button>
                <button className="btn btn-warning" onClick={() => handleEdit(meeting.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(meeting.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingMeetings;
