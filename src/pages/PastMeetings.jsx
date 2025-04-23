import { useState } from 'react';
import { format } from 'date-fns';

function PastMeetings() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Client Review Call',
      datetime: '2025-04-18T15:00',
      filesLink: '/files/client-review.zip',
    },
    {
      id: 2,
      title: 'Sprint Retrospective',
      datetime: '2025-04-13T11:00',
      filesLink: '/files/sprint-retro.pdf',
    },
  ]);

  const handleViewFiles = (filesLink) => {
    window.open(filesLink, '_blank');
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Delete this meeting record?');
    if (confirmDelete) {
      setMeetings(meetings.filter(meeting => meeting.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Past Meetings</h2>

      {meetings.length === 0 ? (
        <p>No past meetings found.</p>
      ) : (
        <ul className="list-group">
          {meetings.map(meeting => (
            <li key={meeting.id} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 shadow-sm rounded">
              <div className="mb-2 mb-md-0">
                <div className="fw-bold text-secondary">{format(new Date(meeting.datetime), 'MMM d')}</div>
                <div>{meeting.title}</div>
                <div>{format(new Date(meeting.datetime), 'PPpp')}</div>
              </div>
              <div className="d-flex gap-2 mt-2 mt-md-0">
                <button className="btn btn-info" onClick={() => handleViewFiles(meeting.filesLink)}>Download</button>
                <button className="btn btn-danger" onClick={() => handleDelete(meeting.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PastMeetings;
