import { useState } from 'react';

function ScheduleMeeting() {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const [timezone, setTimezone] = useState('GMT+5:30');

  const handleSubmit = (e) => {
    e.preventDefault();
    const meetingData = { title, datetime, timezone };
    console.log('Scheduling meeting:', meetingData);
    // You can POST this to your backend API here
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-4">
      {/* Title aligned to the left */}
      <h2 className="mb-4 text-start w-100">Schedule Meeting</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light w-100 flex-1 d-flex flex-column">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="My Meeting"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date & Time</label>
          <input 
            type="datetime-local" 
            className="form-control" 
            value={datetime} 
            onChange={(e) => setDatetime(e.target.value)} 
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time Zone</label>
          <select 
            className="form-select" 
            value={timezone} 
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="GMT+5:30">GMT +5:30 India</option>
            <option value="GMT+0">GMT +0 (UTC)</option>
            <option value="GMT-5">GMT -5 (EST)</option>
            <option value="GMT+1">GMT +1 (CET)</option>
            <option value="GMT+8">GMT +8 (China)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3 align-self-start">
          Save
        </button>
      </form>
      <br />
        <h2 className='mb-4 text-start w-100'>Start New Meeting</h2>
        <div className='border p-4 rounded shadow-sm bg-light w-100 flex-1 d-flex flex-column'>
          <h4>Let's start a new Meeting</h4>
          <button 
            type='button' 
            className='btn btn-warning mt-3 align-self-start'
            // onClick={startZoomMeeting}
          >
            New Meeting
          </button>
        </div>
    </div>
  );
}

export default ScheduleMeeting;
